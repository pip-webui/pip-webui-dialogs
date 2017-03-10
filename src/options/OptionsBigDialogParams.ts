import { OptionsBigDialogData } from './OptionsBigDialogData';

export class OptionsBigDialogParams {
    // Mouse event
    public event?: MouseEvent;   
    // Dialog title 
    public title?: string;  
    // confirm button title
    public ok?: string;
    // Dialog options array
    public options?: OptionsBigDialogData[];
    // Selected option by default
    public selectedOption?: OptionsBigDialogData;
    // Selected Option Name
    public selectedOptionName?: string;    
    // Dialog hint title
    public hint?: string;
    // Show title
    public noTitle: boolean = false;
    // Show action button
    public noActions: boolean = false;
}

