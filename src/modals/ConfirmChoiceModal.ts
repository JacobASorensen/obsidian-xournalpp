import { App, ButtonComponent, Editor, Modal, TextComponent } from "obsidian";

export default class ConfirmChoiceModal extends Modal {
    constructor(
        app: App,
        private titleText: string,
        private message: string,
        private onConfirm: (result: boolean) => void
    ) {
        super(app);
    }

    onOpen() {
        const { contentEl } = this;
        contentEl.createEl("h2", { text: this.titleText });
        contentEl.createEl("p", { text: this.message });

        const buttonContainer = contentEl.createDiv({ cls: "modal-button-container" });

        const confirmButton = buttonContainer.createEl("button", { text: "Yes" });
        confirmButton.addEventListener("click", () => {
            this.close();
            this.onConfirm(true);
        });

        const cancelButton = buttonContainer.createEl("button", { text: "No" });
        cancelButton.addEventListener("click", () => {
            this.close();
            this.onConfirm(false);
        });
    }

    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
}
