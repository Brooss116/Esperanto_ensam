import os

def search_word_in_directory(directory_path, word_to_search):
    """
    Recherche un mot dans tous les fichiers d'un répertoire, sans tenir compte des majuscules.

    :param directory_path: Chemin vers le répertoire à analyser.
    :param word_to_search: Mot à rechercher.
    """
    # Convertir le mot recherché en minuscules pour la comparaison
    word_to_search = word_to_search.lower()
    
    # Parcourir tous les fichiers du répertoire
    for foldername, subfolders, filenames in os.walk(directory_path):
        for filename in filenames:
            file_path = os.path.join(foldername, filename)
            with open(file_path, 'r', encoding='utf-8', errors='ignore') as file:
                # Lire le contenu du fichier et le convertir en minuscules
                content = file.read().lower()
                # Vérifier si le mot est dans le contenu du fichier
                if word_to_search in content:
                    print(f"Le mot '{word_to_search}' a été trouvé dans {file_path}")

# Exemple d'utilisation
directory_path = './'  # Remplacez par le chemin de votre choix
word_to_search = 'Besoin supprimé avec succès !'  # Remplacez par le mot que vous recherchez
search_word_in_directory(directory_path, word_to_search)