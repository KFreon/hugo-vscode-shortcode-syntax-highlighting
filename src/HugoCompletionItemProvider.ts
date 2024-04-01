'use strict';
import * as vscode from 'vscode';
import { Shortcode, knownShortcodeKey } from './extension';

export class HugoCompletionItemProvider implements vscode.CompletionItemProvider {
    private workspaceState: vscode.Memento;

    constructor(state: vscode.Memento) {
        this.workspaceState = state;
    }

    public provideCompletionItems(
        document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): Thenable<vscode.CompletionItem[]> {
        const shortcodes = this.workspaceState.get<Shortcode[]>(knownShortcodeKey) ?? [];
        const completionItems = shortcodes.map(x => new vscode.CompletionItem(x.name, vscode.CompletionItemKind.Snippet));
        return Promise.resolve(completionItems);
    }
}
