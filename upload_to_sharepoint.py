import os
from office365.sharepoint.client_context import ClientContext
from office365.sharepoint.files.file import File
from office365.sharepoint.authentication import AuthenticationContext
from office365.sharepoint.folders.folder import Folder

# Datos de autenticación y configuración
site_url = "https://<your-tenant>.sharepoint.com/sites/<your-site>"
client_id = "<your-client-id>"
client_secret = "<your-client-secret>"
folder_path = "Documents"  # Carpeta donde se subirán los archivos en SharePoint

def authenticate():
    context = ClientContext(site_url).with_credentials(client_id, client_secret)
    return context

def upload_file_to_sharepoint(local_file_path, file_name):
    context = authenticate()
    target_folder = context.web.lists.get_by_title("Documents").root_folder  # Asegúrate de que el nombre del documento o carpeta sea correcto
    context.load(target_folder)
    context.execute_query()

    with open(local_file_path, 'rb') as file_content:
        target_file = target_folder.upload_file(file_name, file_content)
        context.execute_query()

    print(f"Archivo '{file_name}' subido correctamente a SharePoint.")

# Función principal para subir archivos desde un formulario
def handle_uploaded_file(file_path):
    file_name = os.path.basename(file_path)
    upload_file_to_sharepoint(file_path, file_name)

# Ejemplo de uso (subir un archivo específico)
if __name__ == "__main__":
    # Ruta local del archivo a subir (debes pasarle el archivo que ha sido cargado en tu servidor web)
    local_file_path = "/path/to/your/file.txt"  # Cambia esta ruta al archivo real
    handle_uploaded_file(local_file_path)