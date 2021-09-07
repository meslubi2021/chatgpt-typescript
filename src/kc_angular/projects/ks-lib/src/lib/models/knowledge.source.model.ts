import {UuidModel} from "./uuid.model";
import {SearchModel} from "./google.search.results.model";
import {FileModel} from "./file.model";
import {WebsiteModel} from "./website.model";
import {AuthorModel} from "./author.model";

export type IngestType = 'google' | 'file' | 'website' | 'generic' | 'topic' | 'search' | 'note';

// TODO: track down all of these and replace them with something more appropriate
// TODO: they originally started as a way to switch the "add to project" and "remove from project" buttons on KS
export type SourceReference = 'search' | 'list' | 'extract';

// TODO: turn this into RDF type (Open graph)
export type SourceType = 'article'

export class SourceModel {
  search: SearchModel | undefined;
  file: FileModel | undefined;
  website: WebsiteModel | undefined;

  constructor(file?: FileModel, search?: SearchModel, website?: WebsiteModel) {
    if (!file && !search && !website) {
      throw new Error('SourceModel must contain at lesat one valid source.');
    }
    this.file = file;
    this.search = search;
    this.website = website;
  }
}

export class KnowledgeSourceReference {
  ingestType: IngestType;
  source: SourceModel;
  link: URL | string;

  constructor(ingestType: IngestType, source: SourceModel, link: URL | string) {
    this.ingestType = ingestType;
    this.source = source;
    this.link = link;
  }
}

export class KnowledgeSource {
  associatedProjects?: UuidModel[];
  authors?: AuthorModel[];
  dateCreated: Date;
  dateAccessed: Date;
  dateModified: Date;
  description?: string;
  fileItem?: FileModel;
  googleItem?: SearchModel;
  icon?: any;
  iconUrl?: string;
  id: UuidModel;
  ingestType: IngestType;
  snippet?: string;
  sourceRef?: SourceReference;
  title: string;
  topics?: string[];
  notes: KnowledgeSourceNotes;
  readonly accessLink: URL | string;
  readonly reference: KnowledgeSourceReference;

  constructor(title: string, id: UuidModel, ingestType: IngestType, reference: KnowledgeSourceReference) {
    this.title = title;
    this.id = id;
    this.reference = reference;
    this.ingestType = ingestType;
    this.dateCreated = this.dateModified = this.dateAccessed = new Date();
    this.accessLink = reference.link;
    this.notes = new KnowledgeSourceNotes();
  }
}

export class KnowledgeSourceNotes {
  text: string = '';
  dateCreated: Date;
  dateModified: Date;
  dateAccessed: Date;

  constructor() {
    this.dateCreated = new Date();
    this.dateAccessed = new Date();
    this.dateModified = new Date();
  }

}
