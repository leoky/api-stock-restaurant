import { Request, Response } from 'express';
import { pool } from '../db/connection';

const table = 'inflow';

export default {
    getAll: (req: Request, res: Response) => {
        pool.query(
            `SELECT s.id, s.created_at, i.name, s.reason, s.price, s.quantity, s.note
            FROM inflow s
            LEFT JOIN ingredient i ON s.ingredient = i.id
            `,
            (error, result) => {
                if (error) return res.status(400).json(error);
                res.status(200).json(result.rows);
            });
    },
    create: (req: Request, res: Response) => {
        const { ingredient, reason, price, quantity, note } = req.body;
        pool.query(`INSERT INTO ${table}  (ingredient, reason, price, quantity, note) VALUES ($1, $2, $3, $4, $5)`,
            [parseInt(ingredient), reason, parseInt(price), parseInt(quantity), note], (error, result) => {
                if (error) return res.status(400).json(error);
                res.status(200).json(true);
            });
    },
    // update: (req: Request, res: Response) => {
    //     const id = parseInt(req.params.id);
    //     const { ingredient, reason, price, quantity, note } = req.body;

    //     pool.query(
    //         `UPDATE ${table} SET ingredient = $1, reason = $2, price = $3, quantity = $4, note =$5 WHERE id = $6`,
    //         [parseInt(ingredient), reason, parseInt(price), parseInt(quantity), note, id],
    //         (error, result) => {
    //             if (error) return res.status(400).json(error);
    //             res.status(200).json(true);
    //         });
    // },
    delete: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        pool.query(`DELETE FROM ${table} WHERE id = $1`, [id], (error, result) => {
            if (error) return res.status(400).json(error);
            res.status(200).json(true);
        });
    },
}