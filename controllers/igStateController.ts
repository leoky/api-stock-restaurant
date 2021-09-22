import { Request, Response } from 'express';
import { pool } from '../db/connection';

const table = 'ig_state';

export default {
    getAll: (req: Request, res: Response) => {
        pool.query(
            `SELECT s.id, s.name, COUNT(i.id) as assigned 
            FROM ${table} s
            LEFT JOIN ingredient i ON  s.id = i.state
            GROUP BY s.id`,
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
        const { ingredients, igStateId } = req.body;

        let ig = [];

        if (ingredients) {
            ig = typeof ingredients === 'string' ? JSON.parse(ingredients) : ingredients;

        }

        pool.query(
            `UPDATE ingredient SET state = $1 WHERE id = ANY($2::int[])`,
            [parseInt(igStateId), ig],
            (error, result) => {
                if (error) {
                    return res.status(400).json(error);
                }
                res.status(200).json(true);
            });

    }
}