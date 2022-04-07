class Project {
    constructor(prjName, description,type, id) {
        this.prjName = prjName;
        this.description = description;
        this.type = type;
        this.id = id;
    }
}


class containerProject {
    activeProjects = document.querySelector('.active-projects');
    finishedProjects = document.querySelector('.finished-projects');
}


class ProjectItem {
    constructor(project) {
        this.project = project
    }
    
    render() {
        const projectVisualation = document.createElement('div');
        projectVisualation.draggable = true;
        projectVisualation.id = this.project.id;
        projectVisualation.classList.add('project');
        projectVisualation.classList.add('additional-animate');
        
        projectVisualation.innerHTML = `
                <h3>${this.project.prjName}</h3>
                <p>${this.project.description}</p>
                <button type="button" class="info-btn">
                    More Info
                    <span class="tooltip-text">${this.project.description}<span/>
                </button>
                <button type="button" class="handler-btn">
                    ${
                        this.project.type === 'active' ? 'Finish': 'Activate'
                    }
                </button>
            `;
        return projectVisualation;
    }
}


class ProjectDrag extends containerProject {

    #dragStartHandler = event => {
        // console.log('dragstart');
        event.target.style.opacity = '0.5';
        event.target.style.borderColor = 'rgba(255, 0, 0, 0.8)';
        event.dataTransfer.setData('text/plain', event.target.id);
        event.dataTransfer.setDragImage(event.target, 150, 0);
    }

    #dragOverHandler = event => {
        // console.log('dragover');
        event.preventDefault();
    }

    #dropHandler = (event, btnTypeContent, container) => {
        // console.log('drop');
        let containerType = btnTypeContent === 'Activate'
        if (btnTypeContent === 'Finish') {
            containerType = 'active';
        } else if (btnTypeContent === 'Activate') {
            containerType = 'finished';
        }
        if (event.dataTransfer.getData('text/plain')) {
            const projectId = event.dataTransfer.getData('text/plain');
            const project = document.getElementById(projectId);
            const handlerBtn = project.querySelector('button:last-of-type');

            handlerBtn.textContent = btnTypeContent;
            event.currentTarget.append(project);
            const scrollHeight = container.scrollHeight;
            container.scrollTo(
                {left: 0, top: scrollHeight, behavior: 'smooth'}
            );
            project.style.opacity = 1;
            project.style.borderColor = 'rgb(184, 181, 181)';
        }
        event.preventDefault();
    }

    #dragEndHandler = event => {
        // console.log('dragend');
        event.target.style.opacity = 1;
        event.target.style.borderColor = 'rgb(184, 181, 181)';
    }

    dragDropActiveProject = () => {
        this.activeProjects.addEventListener('dragstart', this.#dragStartHandler)

        this.finishedProjects.addEventListener('dragover', this.#dragOverHandler);

        this.finishedProjects.addEventListener('drop', 
            event => this.#dropHandler(event, 'Activate', this.finishedProjects));

        this.activeProjects.addEventListener('dragend', this.#dragEndHandler);
    }

    dragDropFinishedProject = () => {
        this.finishedProjects.addEventListener('dragstart', this.#dragStartHandler)

        this.activeProjects.addEventListener('dragover', this.#dragOverHandler);

        this.activeProjects.addEventListener('drop', 
            event => this.#dropHandler(event, 'Finish', this.activeProjects));
        
        this.finishedProjects.addEventListener('dragend', this.#dragEndHandler);
    }
}


class ProjectList extends containerProject {

    projects = [
        new Project('Game of Thrones','A deramatic historica and fantastic', 'active', 'p1'),
        new Project('God father','About italian mafia and deramatic', 'active', 'p2'),
        new Project('Fight Club','Gamin with your mind so that your thinking deeply', 'active', 'p3'),
        new Project('Leon prefessional','History of a man that he\'s a good practice for life', 'finished', 'p4'),
        new Project('Dexter','History of a man that he\'s labaratory man', 'finished', 'p5'),
    ];
   
    activationBtnHandler = (project, handlerBtn) => {
       
        const btnType = handlerBtn.textContent.trim();

        if (btnType === 'Finish') {
            handlerBtn.textContent = 'Activate';
            this.finishedProjects.append(project);
            const scrollHeightFinishedContainer = this.finishedProjects.scrollHeight;
            this.finishedProjects.scrollTo(
                {left: 0, top: scrollHeightFinishedContainer, behavior: 'smooth'}
            );
        } else if (btnType === 'Activate') {
            handlerBtn.textContent = 'Finish';
            this.activeProjects.append(project);
            const scrollHeightActiveContainer = this.activeProjects.scrollHeight;
            this.activeProjects.scrollBy(
                {left: 0, top: scrollHeightActiveContainer, behavior: 'smooth'}
            );
        }
    }

    #changeActivation() {
        const projectsRendered = document.querySelectorAll('.project');
        for (const project of projectsRendered) {
            const handlerBtn = project.querySelector('.handler-btn');
            handlerBtn.addEventListener('click', this.activationBtnHandler.bind(this, project, handlerBtn));
        }        
    }

    render () {

        for (const project of this.projects) {
            const projectItem = new ProjectItem(project);
            const projectItemDom = projectItem.render();
        
            if (project.type === 'active') {
                this.activeProjects.append(projectItemDom);
            } else if(project.type === 'finished') {
                this.finishedProjects.append(projectItemDom);
            }
        }
        this.#changeActivation();
    }
}


class App {
    static init() {
        const projectListDom = new ProjectList();
        projectListDom.render();
        const dragOperation = new ProjectDrag()
        dragOperation.dragDropFinishedProject();
        dragOperation.dragDropActiveProject();
    }
}

App.init();
