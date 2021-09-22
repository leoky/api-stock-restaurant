import { Request, Response } from 'express';
import { pool } from '../db/connection';

const table = 'ig_type';

export default {
    getAll: (req: Request, res: Response) => {
        pool.query(
            `SELECT t.id, t.name, COUNT(i.id) as assigned 
            FROM ${table} t
            LEFT JOIN ingredient i ON  t.id = i.type
            GROUP BY t.id`,
            (error, result) => {
                if (error) return res.status(400).json(error);
                res.status(200).json(result.rows);
            });
    },
    create: (req: Request, res: Response) => {
        const { name } = req.body;
        pool.query(`INSERT INTO ${table} (name) VALUES ($1)`, [name], (error, result) => {
            if (error) return res.status(400).json(error);
            res.status(200).json(true);
        });
    },
    update: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const { name } = req.body;
        pool.query(
            `UPDATE ${table} SET name = $1 WHERE id = $2`,
            [name, id],
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
    assignTo: (req: Request, res: Response) => {
        const { ingredients, igTypeId } = req.body;

        let ig = '';

        if (ingredients) {
            ig = typeof ingredients === 'string' ? JSON.parse(ingredients) : ingredients;

        }

        pool.query(
            `UPDATE ingredient SET type = $1 WHERE id = ANY($2::int[])`,
            [parseInt(igTypeId), ig],
            (error, result) => {
                if (error) {
                    return res.status(400).json(error);
                }
                res.status(200).json(true);
            });

    },
}