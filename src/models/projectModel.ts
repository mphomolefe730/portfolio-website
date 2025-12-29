import categoryTypes from '../configs/categoryTypes.ts';

export default class ProjectModel {
	title?: string;
	description?: string[];
	timeline?:{date:string,description:string}[] | [];
	function?:{title:string, description:string, src:string[]}[] | [];
	image?: string;
	resource_images?: {title:string,image_link:string}[];
	project_status?: string;
	project_link?:string;
	confirmation_link?:string;
	video_link?:string;
	category?: categoryTypes[];
	last_update?:string;
	type?: string;
}
