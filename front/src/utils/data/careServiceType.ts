export interface careServiceType {
    readonly value: string;
    readonly label: string;
  }


export const careServiceTypes: readonly careServiceType[] = [
    { value: 'chirurgie', label: 'Chirurgie'},
    { value: 'medecine', label: 'Médecine'},
    { value: 'urgence', label: 'Urgence'},
    { value: 'bloc_op', label: 'Bloc opératoire'},
    { value: 'orange', label: 'Orange' },
    { value: 'yellow', label: 'Yellow'},
    { value: 'green', label: 'Green'},
    { value: 'forest', label: 'Forest'},
    { value: 'slate', label: 'Slate' },
    { value: 'silver', label: 'Silver' },
  ];