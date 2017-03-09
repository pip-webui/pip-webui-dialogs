import { OptionsBigData } from './OptionsBigData';

export class OptionsBigParams {
    public title?: string;  
    public applyButtonTitle?: string;
    public options?: OptionsBigData[];
    public selectedOption?: OptionsBigData;
    public deleted?: boolean;
    public selectedOptionName?: string;
    public deletedTitle?: string;
    public hint?: string;
    public noTitle: boolean = false;
    public noActions: boolean = false;
    public optionIndex: number = 0;
}
