'use strict';
import * as vscode from 'vscode';
import { Shortcode, knownShortcodeKey } from './extension';

export class HugoDefinitionProvider implements vscode.DefinitionProvider {
    private workspaceState: vscode.Memento;

    constructor(state: vscode.Memento) {
        this.workspaceState = state;
    }

    public provideDefinition(
        document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): Thenable<vscode.Location | undefined> {
        const text = document.getWordRangeAtPosition(position);
        const name = document.getText(text);

        const shortcodes = this.workspaceState.get<Shortcode[]>(knownShortcodeKey) ?? [];
        const match = shortcodes.find(x => x.name === name);

        if (!match) return Promise.resolve(undefined);

        const location = new vscode.Location(match.uri, new vscode.Position(0, 0));
        return Promise.resolve(location);
    }
}
