import { OptionsBigParams } from './OptionsBigParams';
import { OptionsBigData } from './OptionsBigData';

export interface IOptionsBigDialogController {
    onOk(): void;
    onCancel(): void;
    onKeyUp(event: JQueryKeyEventObject, index: number): void;
    onOptionSelect(event: ng.IAngularEvent, option: OptionsBigData);
    onSelected(): void;
    onSelect: Function;
    config: OptionsBigParams;
    theme: string;
}