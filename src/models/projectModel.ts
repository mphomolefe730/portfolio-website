import categoryTypes from '../configs/categoryTypes.ts';

export default class ProjectModel {
	title?: string;
	description?: string;
	image?: string;
	resource_images?: {title:string,image_link:string}[];
	project_link?:string;
	video_link?:string;
	category?: categoryTypes[];
	last_update?:string;
}
