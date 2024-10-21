export default class ProjectModel {
	title?: string;
	description?: string;
	image?: string;
	resource_images?: {title:string,image_link:string}[];
	project_link?:string;
	last_update?:string;
}
