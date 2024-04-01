'use strict';
import * as vscode from 'vscode';

const knownShortcodeKey = 'knownShortcodes'

export async function activate(context: vscode.ExtensionContext) {
    const shortcodeFiles = await vscode.workspace.findFiles("**/layouts/shortcodes/*.html")
    const shortcodes = shortcodeFiles
        .map(file => file.path.replace('\\', '/').split('/').pop()) // I can't use ${pathSeparator} ?
        .filter(filePath => filePath !== undefined)
        .map(filePath => filePath!.slice(0, filePath!.length - 5));

    await context.workspaceState.update(knownShortcodeKey, shortcodes);

    const provider = new HugoCompletionItemProvider(context.workspaceState);
    const triggerChars = ['%', '<']

    context.subscriptions.push(vscode.languages.registerCompletionItemProvider('markdown', provider, ...triggerChars))
}

class HugoCompletionItemProvider implements vscode.CompletionItemProvider {
    private workspaceState: vscode.Memento;

    constructor(state: vscode.Memento){
        this.workspaceState = state;
    }

    public provideCompletionItems(
        document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken):
        Thenable<vscode.CompletionItem[]> {
            const shortcodes = this.workspaceState.get<string[]>(knownShortcodeKey) ?? []
            const completionItems = shortcodes.map(x => new vscode.CompletionItem(x, vscode.CompletionItemKind.Snippet));
        return Promise.resolve(completionItems);
    }
}