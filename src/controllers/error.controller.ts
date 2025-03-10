export const get404Page = (req: any, res: any, next: any) => {
	res.send('<p>Error 404! Page Not Found</p>');
	res.end();
};
