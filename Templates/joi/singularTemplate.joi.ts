import { object, string, boolean, ObjectSchema } from 'joi';

/**
 *  Template Schema Declaration (Before REST communication)
 */

export const templateSchema: ObjectSchema = object({
  templateName: string().required()
});