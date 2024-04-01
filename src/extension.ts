'use strict';
import * as vscode from 'vscode';
import { HugoCompletionItemProvider } from './HugoCompletionItemProvider';
import { HugoDefinitionProvider } from './HugoDefinitionProvider';

export const knownShortcodeKey = 'knownShortcodes'

export interface Shortcode {
    uri: vscode.Uri,
    name: string
}

export async function activate(context: vscode.ExtensionContext) {
    const shortcodeFiles = await vscode.workspace.findFiles("**/layouts/shortcodes/*.html")
    const shortcodes: Shortcode[] = shortcodeFiles
        .map(file => ({
            uri: file,
            name: file.path.replace('\\', '/').split('/').pop() // I can't use ${pathSeparator} ?
        }))
        .filter(shortcode => shortcode.name !== undefined)
        .map(shortcode => ({
            uri: shortcode.uri,
            name: shortcode.name!.slice(0, shortcode.name!.length - 5),
        }))

    await context.workspaceState.update(knownShortcodeKey, shortcodes);

    const provider = new HugoCompletionItemProvider(context.workspaceState);
    const triggerChars = ['%', '<']

    context.subscriptions.push(vscode.languages.registerCompletionItemProvider('markdown', provider, ...triggerChars))

    context.subscriptions.push(vscode.languages.registerDefinitionProvider('markdown', new HugoDefinitionProvider(context.workspaceState)));
}