import {readFile,writeFile} from 'fs/promises';
const dbFile = 'public/DB/index.json' ;

export const taskController =  {
    async getAllTask(req,res,next) {
        try {
          const data = await readFile(dbFile, "utf8");
          res.json(JSON.parse(data));
        } catch (error) {
            console.log("error at get task");
          next(error);
        }
    },
 
    async createTask(req,res,next) {
        try{
            const data = await readFile(dbFile,'utf8');
            const tasks = JSON.parse(data);
            const newTask = {
                ...req.body,
                completed:false
            };
            tasks.push(newTask);
            await writeFile(dbFile , JSON.stringify(tasks,null,2));
            res.status(201).json(newTask);
        } catch(error) {
            next(error);
        }
    },
    async updateTask(req,res,next) {    
        try{
            const data = await readFile(dbFile,'utf8');
            let tasks = JSON.parse(data);
            const taskIndex = tasks.findIndex(task => task.id === req.params.id)        
            if(taskIndex === -1){
                return res.status(404).json({message: 'Task is not updated'});
            }

            tasks[taskIndex] = { ...tasks[taskIndex], ...req.body};
            await writeFile(dbFile , JSON.stringify(tasks,null,2));
            res.status(200).json(tasks[taskIndex]);
        } catch(error) {
            next(error);
        }
    },

    async deleteTask(req,res,next){
        try{
            const data = await readFile(dbFile, 'utf8');
            let tasks = JSON.parse(data);         
            tasks = tasks.filter(task => task.id !== req.params.id);
            await writeFile(dbFile , JSON.stringify(tasks,null,2));
            res.status(204).send();
        }catch(error){
            next(error);
        }
    }
}
