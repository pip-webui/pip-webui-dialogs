import { OptionsBigDialogData } from './OptionsBigDialogData';

export class OptionsBigDialogParams {
    public title?: string;  
    public applyButtonTitle?: string;
    public options?: OptionsBigDialogData[];
    public selectedOption?: OptionsBigDialogData;
    public deleted?: boolean;
    public selectedOptionName?: string;
    public deletedTitle?: string;
    public hint?: string;
    public noTitle: boolean = false;
    public noActions: boolean = false;
    public optionIndex: number = 0;
}
