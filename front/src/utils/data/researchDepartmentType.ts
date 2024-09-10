export interface researchDepartment {
    readonly value: string;
    readonly label: string;
  }


export const researchDepartments: readonly researchDepartment[] = [
    { value: 'science_bio', label: 'Science Biologique'},
    { value: 'santé_pub', label: 'Santé Publique'},
    { value: 'st_sante', label: ' Sciences et technologies pour la santé '},
    { value: 'science_env', label: "Sciences de l’environnement "},
    { value: 'science_ing_num', label: "Sciences de l’ingénierie et du numérique "},
    { value: 'science_mat', label: 'Sciences de la matière et du rayonnement '},
    { value: 'science_archeo', label: 'Sciences archéologiques'},
    { value: 'forest', label: 'Forest'},
    { value: 'slate', label: 'Slate' },
    { value: 'silver', label: 'Silver' },
  ];