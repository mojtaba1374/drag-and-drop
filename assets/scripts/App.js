const Projects = [
    {
        prjName: 'Game of Thrones',
        description: 'A deramatic historica and fantastic',
        type: 'active'
    },
    {
        prjName: 'God father',
        description: 'About italian mafia and deramatic',
        type: 'active'
    },
    {
        prjName: 'Fight Club',
        description: 'Gamin with your mind so that your thinking deeply',
        type: 'active'
    },
    {
        prjName: 'Leon prefessional',
        description: 'History of a man that he\'s a good practice for life',
        type: 'finished'
    },
    {
        prjName: 'Dexter',
        description: 'History of a man that he\'s labaratory man',
        type: 'finished'
    }
];

const activeProjects = document.querySelector('.active-projects');
const finishedProjects = document.querySelector('.finished-projects');

for (const project of Projects) {
    
    const projectVisualation = document.createElement('div')
    projectVisualation.classList.add('project');
    projectVisualation.classList.add('additional-animate');
    
    projectVisualation.innerHTML = `
            <h3>${project.prjName}</h3>
            <p>${project.description}</p>
            <button type="button" class="info-btn">
                More Info
                <span class="tooltip-text">${project.description}<span/>
            </button>
            <button type="button" class="handler-btn">
                ${
                    project.type === 'active' ? 'Finish': 'Activate'
                }
            </button>
        `;

    if (project.type === 'active') {
        activeProjects.append(projectVisualation);
    } else if(project.type === 'finished') {
        finishedProjects.append(projectVisualation);
    }
}


const projectsRendered = document.querySelectorAll('.project');

const activationBtnHandler = (project, handlerBtn) => {

    const btnType = handlerBtn.textContent.trim();

    if (btnType === 'Finish') {
        handlerBtn.textContent = 'Activate';
        finishedProjects.append(project);
    } else if (btnType === 'Activate') {
        handlerBtn.textContent = 'Finish';
        activeProjects.append(project);
    }
}

for (const project of projectsRendered) {
    const handlerBtn = project.querySelector('.handler-btn');
    handlerBtn.addEventListener('click', activationBtnHandler.bind(this, project, handlerBtn));
}










//  Drag and Drop brtor kamel ba tozijat albate baraye actice 
//  projects haee ke be finished-container drag mishavand 

class ProjectDrag extends containerProject {

    dragStart = () => {
        this.activeProjects.addEventListener('dragstart', event => {
            console.log('dragstart');
            // console.log(event.target);  //elmani ke drag mishavad mibashad.
            event.target.style.opacity = '0.5';
            event.target.style.borderColor = 'rgba(255, 0, 0, 0.8)';
            event.dataTransfer.setData('text/plain', event.target.id);
            event.dataTransfer.setDragImage(event.target, 150, 0);
        });

        this.finishedProjects.addEventListener('dragover', event => {
            // console.log('drgover');
            //khode this.finishedProject ast ke har chan ms yekbar update mishavad.
            // console.log(event.target); 
            event.preventDefault();
        });

        this.finishedProjects.addEventListener('dragenter', event => {
            console.log('drageneter');
            // console.log(event.target);
            // event.currentTarget.classList.contains('finished-projects') ? 
            // event.currentTarget.style.backgroundColor = 'red': null;
        });
        
        this.finishedProjects.addEventListener('dragleave', event => {
            console.log('dragleave');
            // console.log(event.target);
            // event.currentTarget.style.backgroundColor = 'white';
        });

        this.finishedProjects.addEventListener('drop', event => {
            event.preventDefault();
            console.log('droped');

            const projectId = event.dataTransfer.getData('text/plain');
            const project = document.getElementById(projectId);
            const handlerBtn = project.querySelector('button:last-of-type');

            handlerBtn.textContent = 'Activate';
            const scrollHeightFinishedContainer = this.finishedProjects.scrollHeight;

            event.currentTarget.append(project);

            console.log(scrollHeightFinishedContainer);
            this.finishedProjects.scrollTo(
                {left: 0, top: scrollHeightFinishedContainer, behavior: 'smooth'}
            );
            project.style.opacity = 1;
            project.style.borderColor = 'rgb(184, 181, 181)';
        });

        this.activeProjects.addEventListener('dragend', event => {
            console.log('dragend');
            // console.log(event.target);
            event.target.style.opacity = 1;
            event.target.style.borderColor = 'rgb(184, 181, 181)';
        });
    }
}
