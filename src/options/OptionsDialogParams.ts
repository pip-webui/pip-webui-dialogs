import { OptionsDialogData } from './OptionsDialogData';

export class OptionsDialogParams {
    // Mouse event
    public event?: MouseEvent;
    // Dialog title 
    public title?: string;
    // confirm button title
    public applyButtonTitle?: string;
    // Dialog options array
    public options?: OptionsDialogData[];
    // Selected option by default
    public selectedOption?: OptionsDialogData;
    // Selected Option Name
    public selectedOptionName?: string;
    // Show checkbox
    public deleted?: boolean;
    // Checkbox caption
    public deletedTitle?: string;
}
