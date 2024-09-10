export interface supportService {
    readonly value: string;
    readonly label: string;
  }


export const supportServices: readonly supportService[] = [
    { value: 'pharmacie', label: 'Pharmacie'},
    { value: 'analyse', label: 'Analyse'},
    { value: 'hygiéniste', label: 'Hygiéniste'},
    { value: 'bloc_op', label: 'Bloc opératoire'},
    { value: 'orange', label: 'Orange' },
    { value: 'yellow', label: 'Yellow'},
    { value: 'green', label: 'Green'},
    { value: 'forest', label: 'Forest'},
    { value: 'slate', label: 'Slate' },
    { value: 'silver', label: 'Silver' },
  ];