import openai
import os
from langchain.llms import AzureOpenAI
from langchain.chat_models import AzureChatOpenAI
from langchain.document_loaders import WebBaseLoader
from langchain.indexes import VectorstoreIndexCreator
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Chroma

from langchain.chains import RetrievalQA

openai.api_key = "f9e438c0871042d1bfdfb01cfd30d79e" # os.getenv("f9e438c0871042d1bfdfb01cfd30d79e")
openai.api_base = "https://codecompassopenai.openai.azure.com/" #os.getenv("https://codecompassopenai.openai.azure.com/") # your endpoint should look like the following https://YOUR_RESOURCE_NAME.openai.azure.com/
openai.api_type = 'azure'
openai.api_version = '2023-05-15' # this may change in the future

OPENAI_API_KEY = "f9e438c0871042d1bfdfb01cfd30d79e"
api_base = "https://codecompassopenai.openai.azure.com/"
deployment_name = "codecompass-gpt"
emb_name = "codecompass_emb"

# Send a completion call to generate an answer
print('Sending a test completion job')
start_phrase = 'La rutina matutina de ayurverda '
response = openai.Completion.create(engine=deployment_name, prompt=start_phrase, max_tokens=10)
text = response['choices'][0]['text'].replace('\n', '').replace(' .', '.').strip()
print(start_phrase+text)

print()
print("--------------------")

loader = WebBaseLoader("https://lilianweng.github.io/posts/2023-06-23-agent/")
data = loader.load()

text_splitter = RecursiveCharacterTextSplitter(chunk_size = 500, chunk_overlap = 0)
all_splits = text_splitter.split_documents(data)

vectorstore = Chroma.from_documents(documents=all_splits, embedding=OpenAIEmbeddings(openai_api_key=OPENAI_API_KEY,
                                                                                     deployment=deployment_name,
                                                                                     model=emb_name,
                                                                                     openai_api_base=api_base,
                                                                                     openai_api_type="azure",))


# loader = WebBaseLoader("https://lilianweng.github.io/posts/2023-06-23-agent/")
# index = VectorstoreIndexCreator().from_loaders([loader])

# print(index.query("What is Task Decomposition?"))