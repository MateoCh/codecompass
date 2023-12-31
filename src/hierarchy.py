import os
import sys

def get_hierarchy(directorio, nivel=0, max_archivos=15):
    if not os.path.exists(directorio):
        return "El directorio no existe"

    if not os.path.isdir(directorio):
        return "La ruta proporcionada no es un directorio"

    resultado = ""

    for item in os.listdir(directorio):
        item_ruta = os.path.join(directorio, item)
        indentacion = "  " * nivel

        if os.path.isfile(item_ruta):
            resultado += f"{indentacion}- {item}\n"
        elif os.path.isdir(item_ruta):
            resultado += f"{indentacion}+ {item}/\n"
            if nivel < max_archivos:
                resultado += get_hierarchy(item_ruta, nivel=nivel + 1, max_archivos=max_archivos)

    return resultado

if __name__ == '__main__':
    lines = sys.stdin.readlines()
    # print(sys.argv)
    directorio_a_analizar = lines[0].replace('\n',"") #r"C:/Users/lrodr/OneDrive - Universidad de los Andes/laura/2023-2/CodeSavant/pythonshell/prueba"
    # print(type(directorio_a_analizar))
    # print(directorio_a_analizar)
    hierarchy = get_hierarchy(directorio_a_analizar)
    f = open ("C:/Users/lrodr/OneDrive - Universidad de los Andes/laura/2023-2/CodeSavant/codecompass/src/scripts/hierarchy.txt",'w')
    f.write(hierarchy)
    f.close()

    print(hierarchy)