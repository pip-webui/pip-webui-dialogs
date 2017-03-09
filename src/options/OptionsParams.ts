import { OptionsData } from './OptionsData';

export class OptionsParams {
    public title?: string;  
    public applyButtonTitle?: string;
    public options?: OptionsData[];
    public selectedOption?: OptionsData;
    public deleted?: boolean;
    public selectedOptionName?: string;
    public deletedTitle?: string;
}