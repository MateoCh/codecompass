// import { PythonShell } from 'python-shell';
// let {PythonShell} = require('python-shell')

class Chatbot {
  private hierarchy: string = '';

  async runHierarchyScript() {
    const pyshell = new PythonShell('hierarchy.py');

    pyshell.send('C:/Users/lrodr/OneDrive - Universidad de los Andes/laura/2023-2/CodeSavant/pythonshell/prueba');

    pyshell.on('message', (message: string) => {
      console.log(message);
      this.hierarchy += message;
    });

    return new Promise<void>((resolve, reject) => {
      pyshell.end((err: any) => {
        if (err) {
          reject(err);
        } else {
          console.log('Hierarchy script finished');
          resolve();
        }
      });
    });
  }

  async runQAScript(question: string) {
    const pyshell2 = new PythonShell('qa.py');

    pyshell2.send(question);

    pyshell2.on('message', (message: string) => {
      let message1 = message;
      console.log(message1);
    });

    return new Promise<void>((resolve, reject) => {
      pyshell2.end((err: any) => {
        if (err) {
          reject(err);
        } else {
          console.log('QA script finished');
          resolve();
        }
      });
    });
  }

  async startChat(question: string) {
    try {
      await this.runHierarchyScript();

      console.log(this.hierarchy);

    //   const question = 'What food should I give to my dog?';
      await this.runQAScript(question);

      // You can continue the chat logic here.
    } catch (error) {
      console.error('Error:', error);
    }
  }
}

// const question = 'What food should I give to my dog?';
// const chatbot = new Chatbot();
// chatbot.startChat(question);
