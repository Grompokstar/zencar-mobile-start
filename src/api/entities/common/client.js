import User     from './user';
import { File } from './files';

const Client = {
	...User,
	photos: File,
	partnerSource: true,
	tatneftCard: true,
	troikaCard: true
};

export default Client;