import { OptionsDialogData } from './OptionsDialogData';

export class OptionsDialogParams {
    public event: MouseEvent;
    public title?: string;  
    public applyButtonTitle?: string;
    public options?: OptionsDialogData[];
    public selectedOption?: OptionsDialogData;
    public deleted?: boolean;
    public selectedOptionName?: string;
    public deletedTitle?: string;
}