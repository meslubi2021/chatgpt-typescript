import {Injectable} from '@angular/core';
import {ProjectTree, ProjectTreeNode} from "../../models/project.tree.model";
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ProjectCreationRequest, ProjectModel, ProjectUpdateRequest} from "../../models/project.model";
import {KnowledgeSourceModel} from "../../models/knowledge.source.model";

let sampleProjects: ProjectModel[] = [
  {
    name: 'CS 180',
    id: 'cs-180',
    authors: ['Rob Royce'],
    knowledgeSource: [
      {
        title: "Turing test - Wikipedia",
        ingestType: 'google',
        googleItem: {
          ingestType: 'google',
          cacheId: 'abcdefg',
          displayLink: "en.wikipedia.org",
          formattedUrl: "https://en.wikipedia.org/wiki/Turing_test",
          htmlFormattedUrl: "https://en.wikipedia.org/wiki/<b>Turing</b>_test",
          htmlSnippet: "The <b>Turing</b> test, originally called the imitation game by Alan <b>Turing</b> in 1950," +
            " is a test of a machine&#39;s ability to exhibit intelligent behaviour equivalent to,&nbsp;...",
          htmlTitle: "<b>Turing</b> test - Wikipedia",
          kind: "customsearch#result",
          link: "https://en.wikipedia.org/wiki/Turing_test",
          pagemap: {},
          snippet: "The Turing test, originally called the imitation game by Alan Turing in 1950, is a test of a" +
            " machine's ability to exhibit intelligent behaviour equivalent to, ...",
          title: "Turing test - Wikipedia"
        }
      },
      {
        title: "Breadth-first search - Wikipedia",
        ingestType: 'google',
        googleItem: {
          ingestType: 'google',
          cacheId: "jEQeW6JwIN4J",
          displayLink: "en.wikipedia.org",
          formattedUrl: "https://en.wikipedia.org/wiki/Breadth-first_search",
          htmlFormattedUrl: "https://en.wikipedia.org/wiki/<b>Breadth</b>-<b>first</b>_<b>search</b>",
          htmlSnippet: "<b>Breadth</b>-<b>first search</b> (<b>BFS</b>) is an algorithm for searching a tree data" +
            " structure for a node that satisfies a given property. It starts at the tree root and explores all&nbsp;...",
          htmlTitle: "<b>Breadth</b>-<b>first search</b> - Wikipedia",
          iconUrl: "https://en.wikipedia.org/favicon.ico",
          kind: "customsearch#result",
          link: "https://en.wikipedia.org/wiki/Breadth-first_search",
          pagemap: {},
          snippet: "Breadth-first search (BFS) is an algorithm for searching a tree data structure for a node that" +
            " satisfies a given property. It starts at the tree root and explores all ...",
          title: "Breadth-first search - Wikipedia"
        }
      },
      {
        title: "Demystifying Depth-First Search. Once you've learned enough ...",
        ingestType: 'google',
        googleItem: {
          ingestType: 'google',
          cacheId: "bUwcjLwCE0wJ",
          displayLink: "medium.com",
          formattedUrl: "https://medium.com/basecs/demystifying-depth-first-search-a7c14cccf056",
          htmlFormattedUrl: "https://medium.com/basecs/demystifying-<b>depth</b>-<b>first</b>-<b>search</b>-a7c14cccf056",
          htmlSnippet: "Apr 3, 2017 <b>...</b> In <b>depth</b>-<b>first search</b>, once we start down a path, we" +
            " don&#39;t stop until we get to the end. In other words, we traverse through one branch of a tree&nbsp;...",
          htmlTitle: "Demystifying <b>Depth</b>-<b>First Search</b>. Once you&#39;ve learned enough ...",
          iconUrl: "https://medium.com/favicon.ico",
          kind: "customsearch#result",
          link: "https://medium.com/basecs/demystifying-depth-first-search-a7c14cccf056",
          pagemap: {
            cse_image: [{
              src: "https://miro.medium.com/max/1200/1*cpvBj8a_cCDKSZOhKxVSTg.jpeg"
            }],
            cse_thumbnail: [{
              height: "198",
              src: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRPG-ne5ZTLwTGTgx9nIPd5ARvhvRv2ImXZn79oymsNwlJBc7p5dbt_1qA",
              width: "254"
            }]
          },
          snippet: "Apr 3, 2017 ... In depth-first search, once we start down a path, we don't stop until we get to the end." +
            " In other words, we traverse through one branch of a tree ...",
          title: "Demystifying Depth-First Search. Once you've learned enough ..."
        }
      }
    ]
  },
  {
    name: 'Greedy Algorithms',
    id: 'greedy-algorithms',
    parentId: 'cs-180',
    knowledgeSource: [
      {
        title: "Greedy Algorithms | Brilliant Math & Science Wiki",
        ingestType: 'google',
        googleItem: {
          ingestType: 'google',
          cacheId: "05QsbCqkbVEJ",
          displayLink: "brilliant.org",
          formattedUrl: "https://brilliant.org/wiki/greedy-algorithm/",
          htmlFormattedUrl: "https://brilliant.org/wiki/<b>greedy</b>-<b>algorithm</b>/",
          htmlSnippet: "A <b>greedy algorithm</b> is a simple, intuitive algorithm that is used in optimization" +
            " problems. The algorithm makes the optimal choice at each step as it attempts to find&nbsp;...",
          htmlTitle: "<b>Greedy Algorithms</b> | Brilliant Math &amp; Science Wiki",
          iconUrl: "https://brilliant.org/favicon.ico",
          kind: "customsearch#result",
          link: "https://brilliant.org/wiki/greedy-algorithm/",
          pagemap: {
            cse_thumbnail: [{src: "https://brilliant.org/site_media/version-1a4dfc4f1b/images/open-graph/default.png"}],
          },
          snippet: "A greedy algorithm is a simple, intuitive algorithm that is used in optimization problems. The" +
            " algorithm makes the optimal choice at each step as it attempts to find ...",
          title: "Greedy Algorithms | Brilliant Math & Science Wiki"
        }
      },
      {
        title: "Greedy algorithm - Wikipedia",
        ingestType: 'google',
        googleItem: {
          ingestType: 'google',
          cacheId: "CgN6Ext_dpEJ",
          displayLink: "en.wikipedia.org",
          formattedUrl: "https://en.wikipedia.org/wiki/Greedy_algorithm",
          htmlFormattedUrl: "https://en.wikipedia.org/wiki/<b>Greedy</b>_<b>algorithm</b>",
          htmlSnippet: "A <b>greedy algorithm</b> is any algorithm that follows the problem-solving heuristic of" +
            " making the locally optimal choice at each stage. In many problems, a greedy&nbsp;...",
          htmlTitle: "<b>Greedy algorithm</b> - Wikipedia",
          iconUrl: "https://en.wikipedia.org/favicon.ico",
          kind: "customsearch#result",
          link: "https://en.wikipedia.org/wiki/Greedy_algorithm",
          pagemap: {
            cse_thumbnail: [{src: "https://upload.wikimedia.org/wikipedia/commons/thu…ents.svg/1200px-Greedy_algorithm_36_cents.svg.png"}]
          },
          snippet: "A greedy algorithm is any algorithm that follows the problem-solving heuristic of making the" +
            " locally optimal choice at each stage. In many problems, a greedy ...",
          title: "Greedy algorithm - Wikipedia"
        }
      }
    ]
  },
  {
    name: 'Network Flow Algorithms',
    id: 'network-flow-algorithms',
    parentId: 'cs-180'
  },
  {
    name: 'Search Algorithms',
    id: 'search-algorithms',
    parentId: 'cs-180'
  },
  {
    name: 'A* Search',
    id: 'a-star-search',
    parentId: 'search-algorithms'
  },
  {
    name: 'PageRank',
    id: 'page-rank',
    parentId: 'search-algorithms'
  },
  {
    name: 'CS 181',
    id: 'cs-181'
  },
  {
    name: "NFA's and DFA's",
    id: 'nfa-and-dfas',
    parentId: 'cs-181'
  },
  {
    name: 'Context-Free Grammars (CFG\'s)',
    id: 'context-free-grammars',
    parentId: 'cs-181'
  }
]

export const contentHeaders = new HttpHeaders()
  .set('Accept', 'application/json')
  .set('Content-Type', 'application/json');

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  allProjects: BehaviorSubject<ProjectTreeNode[]>;
  private URL_PREFIX = 'http://localhost:8000';
  private tree: ProjectTree;
  private projectSource: ProjectModel[] = [];
  private lookup: Map<string, ProjectModel>;
  private selectedSource = new BehaviorSubject<ProjectModel>({
    authors: [],
    subprojects: [],
    creationDate: '',
    description: '',
    id: '',
    lastModified: '',
    name: '',
    parentId: '',
    tags: []
  });
  currentProject = this.selectedSource.asObservable();

  constructor(private http: HttpClient) {
    this.allProjects = new BehaviorSubject<ProjectTreeNode[]>([]);
    this.lookup = new Map();
    this.tree = new ProjectTree();
    this.projectSource = sampleProjects;
    this.refreshTree();
  }

  get data(): ProjectTreeNode[] {
    return this.allProjects.value;
  }

  refreshTree(): void {
    this.lookup = new Map();
    this.tree = new ProjectTree();

    console.log('Refreshing tree with projectSource: ', this.projectSource);

    this.buildTree(this.projectSource);
    this.initialize();

    // this.getAllProjects().subscribe(
    //     projects => {
    //         for (const project of projects) {
    //             this.lookup.set(project.id, project);
    //             if (!project.parentId) {
    //                 this.projectSource.unshift(project);
    //             } else {
    //                 this.projectSource.push(project);
    //             }
    //         }
    //         this.buildTree(this.projectSource);
    //         this.initialize();
    //     },
    //     error => {
    //         console.error('ProjectService: Unable to get projects from source...');
    //         console.error(error);
    //     });
  }

  initialize(): void {
    const data = this.buildFileTree(this.tree.asArray(), 0);

    this.allProjects.next(data);

    if (data[0]) {
      this.setCurrentProject(data[0].id);
    } else {
      this.selectedSource.next({
        authors: [],
        creationDate: '',
        description: '',
        id: '',
        lastModified: '',
        name: '',
        parentId: '',
        subprojects: [],
        tags: []
      });
      this.setCurrentProject(this.selectedSource?.value?.id ? this.selectedSource.value.id : '');
    }
  }

  buildFileTree(source: ProjectTreeNode[], level: number): ProjectTreeNode[] {
    const tree: ProjectTreeNode[] = [];
    for (const node of source) {
      if (node.subprojects.length > 0) {
        this.buildFileTree(node.subprojects, level + 1);
      }
      tree.push(node);
    }
    return tree;
  }

  buildTree(input: ProjectModel[]): void {
    const visited = new Map<string, boolean>();

    for (const model of input) {
      if (model?.id && !visited.get(model.id)) {
        const node = this.modelToNode(model);

        if (model.subprojects)
          for (const subId of model.subprojects) {
            const sub: ProjectModel | undefined = this.lookup.get(subId);
            if (sub) {
              node.subprojects.push(this.modelToNode(sub));
              visited.set(subId, true);
            }
          }
        this.tree.add(node, model.parentId);
        visited.set(node.id, true);
      }
    }
  }

  modelToNode(model: ProjectModel): ProjectTreeNode {
    return new ProjectTreeNode(model.name, model.id, 'project', []);
  }

  projectModelToTreeNode(project: ProjectModel): ProjectTreeNode {
    return new ProjectTreeNode();
  }

  getAllProjects(): Observable<ProjectModel[]> {
    const url = `${this.URL_PREFIX}/app-core/projects`;
    return this.http.get<any>(url);
  }

  newProject(project: ProjectCreationRequest): any {
    let newProject: ProjectModel = {
      name: project.name,
      id: project.name,
      parentId: project.parentId
    };

    this.projectSource.push(newProject);
    this.refreshTree();

    const url = `${this.URL_PREFIX}/app-core/projects`;
    return this.http.post<any>(url, project, {headers: contentHeaders});
  }

  updateProject(projectUpdate: ProjectUpdateRequest) {
    let tmp: KnowledgeSourceModel[] = [];

    if (projectUpdate.knowledgeSource) {
      for (let source of projectUpdate.knowledgeSource) {
        let temp: KnowledgeSourceModel = {
          title: source.title,
          iconUrl: source.iconUrl ? source.iconUrl : `https://${source.googleItem?.displayLink}/favicon.ico`,
          icon: source.icon ? source.icon : null,
          description: source.description ? source.description : source.googleItem?.description,
          ingestType: source.ingestType,
          googleItem: source.googleItem ? source.googleItem : undefined,
          url: source.url ? source.url : (source.googleItem?.link ? source.googleItem.link : '')
        };
        tmp.push(temp);
      }
    }

    console.log('Combined knowledge sources: ', tmp);
    for (let project of this.projectSource) {
      if (project.id === projectUpdate.id) {
        project.knowledgeSource = tmp;
      }
    }

    this.setCurrentProject(projectUpdate.id);

    //
    // const url = `${this.URL_PREFIX}/app-core/projects`;
    // return this.http.put<ProjectModel>(url, projectUpdate);
  }

  setCurrentProject(id: string): void {
    if (id && id !== '') {
      console.log('Getting project ID and setting selectedSource...');
      for (let project of sampleProjects) {
        if (project.id && project.id === id) {
          this.selectedSource.next(project);
        }
      }
      // this.getProject(id)
      //   .subscribe(project => {
      //     this.selectedSource.next(project);
      //   }, error => {
      //     console.error(error);
      //   });
    }

  }

  getCurrentProjectId(): string | undefined {
    return this.selectedSource.value.id;
  }

  getProject(id: string): Observable<ProjectModel> {
    const url = `${this.URL_PREFIX}/app-core/projects/${id}`;
    return this.http.get<ProjectModel>(url);
  }

  deleteProject(id: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const url = `${this.URL_PREFIX}/app-core/projects/${id}`;
      this.http.delete<string>(url).subscribe(result => {
        this.refreshTree();
        resolve(result);
      }, error => {
        console.error(error);
        reject(error);
      });
    });
  }


  addKnowledgeSource(id: string, ks: KnowledgeSourceModel) {
    for (let source of this.projectSource) {
      if (source.id === id) {
        source.knowledgeSource?.push(ks);
        break;
      }
    }
    this.setCurrentProject(id);
  }

  removeKnowledgeSource(id: string, ks: KnowledgeSourceModel) {
    console.log('Removing knowledge source: ', ks, ' from project id: ', id);
    for (let item of this.projectSource)
      if (item.id === id)
        item.knowledgeSource?.forEach((source, idx) => {
          if (item.knowledgeSource && source.title === ks.title)
            item.knowledgeSource.splice(idx, 1);
        });
    this.setCurrentProject(id);
  }
}
