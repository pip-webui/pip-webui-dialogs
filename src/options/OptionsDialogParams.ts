import { OptionsDialogData } from './OptionsDialogData';

export class OptionsDialogParams {
    // Mouse event
    public event?: MouseEvent;
    // Dialog title 
    public title?: string;
    // confirm button title
    public ok?: string;
    // Dialog options array
    public options?: OptionsDialogData[];
    // Selected option by default
    public selectedOption?: OptionsDialogData;
    // Selected Option Name
    public selectedOptionName?: string;
    // Value for checkbox option
    public isCheckboxOption?: boolean;
    // Checkbox caption, Checkbox visible if caption is set
    public checkboxOptionCaption?: string;
}
