import models from '../models';
import BaseService from './base';


const { audit } = models;

export default class AuditService extends BaseService {
    /**
     * @description This service creates new audit row in the audit table
     * @param  {object} payload
     * @returns  {Promise<object>} new Audit
     * @member  AuditService
     */
    static async createAudit(payload) {
        return this.save(audit, payload);
    }
}
