import XoppPlugin from "main";
import { App, Setting, PluginSettingTab } from "obsidian";
import ConfirmChoiceModal from "./modals/ConfirmChoiceModal";

export class XoppSettingsTab extends PluginSettingTab {
    plugin: XoppPlugin;

    constructor(app: App, plugin: XoppPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }
  
    display(): void {
        let { containerEl } = this;
    
        containerEl.empty();
    
        new Setting(containerEl)
            .setName("Auto export Xournal++ files")
            .setDesc("Automatically export Xournal++ files to PDF upon modification.")
            .addToggle((toggle) => {
                toggle
                    .setValue(this.plugin.settings.autoExport)
                    .onChange(async (value) => {
                        if (value) {
                            new ConfirmChoiceModal(this.plugin.app, "Are you sure?", 
                                "Turning this on will overwrite any PDF file that shares \
                                the same name with a xopp file in the same directory.\
                                e.g. if myfile.pdf and myfile.xopp are both in a directory, \
                                myfile.pdf will be replaced with the pdf version of myfile.xopp",(value2) => {
                                this.plugin.settings.autoExport = value2;
                                toggle.setValue(value2);
                            }).open();
                        } else {
                            this.plugin.settings.autoExport = value;
                        }

                        await this.plugin.saveSettings();
                    })
            });

        new Setting(containerEl)
            .setName("Xournal++ installation path")
            .setDesc("The path where Xournal++ is installed (leave empty for system default).")
            .addText((toggle) => {
                toggle
                    .setValue(this.plugin.settings.xournalppPath)
                    .onChange(async (value) => {
                        this.plugin.settings.xournalppPath = value;
                        await this.plugin.saveSettings();
                    })
            });
        
        new Setting(containerEl)
            .setName("Xournal++ template path")
            .setDesc(
                "The relative path of the template for any new Xournal++ file (leave empty to use the default template)."
            )
            .addText((toggle) => {
                toggle
                    .setValue(this.plugin.settings.templatePath)
                    .setPlaceholder("e.g. templates/template.xopp")
                    .onChange(async (value) => {
                        this.plugin.settings.templatePath = value;
                        await this.plugin.saveSettings();
                    });
            });

        new Setting(containerEl)
            .setName("Default path for new Xournal++ files")
            .setDesc(
                "The relative path for new Xournal++ files. This folder will be used unless a full path is specified during file creation (leave empty to use root folder)."
            )
            .addText((toggle) => {
                toggle
                    .setValue(this.plugin.settings.defaultNewFilePath)
                    .setPlaceholder("e.g. Notes")
                    .onChange(async (value) => {
                        this.plugin.settings.defaultNewFilePath = value;
                        await this.plugin.saveSettings();
                    });
            });
    }
  
}
