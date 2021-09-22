import { Request, Response } from 'express';
import { pool } from '../db/connection';

const table = 'uom';

export default {
    getAll: (req: Request, res: Response) => {
        pool.query(`SELECT * FROM ${table}`, (error, result) => {
            if (error) return res.status(400).json(error);
            res.status(200).json(result.rows);
        });
    },
    create: (req: Request, res: Response) => {
        const { name, precision } = req.body;
        pool.query(`INSERT INTO ${table} (name, precision) VALUES ($1, $2)`, [name, precision], (error, result) => {
            if (error) return res.status(400).json(error);
            res.status(200).json(true);
        });
    },
    update: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const { name, precision } = req.body;
        pool.query(
            `UPDATE ${table} SET name = $1, precision = $2 WHERE id = $3`,
            [name, precision, id],
            (error, result) => {
                if (error) return res.status(400).json(error);
                res.status(200).json(true);
            });
    },
    delete: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        pool.query(`DELETE FROM ${table} WHERE id = $1`, [id], (error, result) => {
            if (error) return res.status(400).json(error);
            res.status(200).json(true);
        });
    },
}