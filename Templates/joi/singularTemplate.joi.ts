import { object, string, boolean, ObjectSchema } from 'joi';

/**
 *  Article Schema Declaration (Before REST communication)
 */

export const templateSchema: ObjectSchema = object({
    templateName: string().required(),
});
