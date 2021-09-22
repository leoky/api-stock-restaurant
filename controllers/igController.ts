import { Request, Response } from 'express';
import { pool } from '../db/connection';

const table = 'ingredient';

export default {
    getAll: (req: Request, res: Response) => {
        pool.query(
            `SELECT i.id, i.name, uom.name as uom, ig_state.name as state, ig_type.name as type, SUM(inflow.quantity) as currentStock
            FROM ingredient i
            LEFT JOIN uom ON  i.uom = uom.id
            LEFT JOIN ig_state ON i.state = ig_state.id 
            LEFT JOIN ig_type ON i.type = ig_type.id
            LEFT JOIN inflow ON i.id = inflow.ingredient GROUP BY i.id, uom.name, ig_state.name, ig_type.name
            `,
            (error, result) => {
                if (error) {
                    console.error(error)
                    return res.status(400).json(error);
                }
                res.status(200).json(result.rows);
            });
    },
    create: (req: Request, res: Response) => {
        const { name, uom, state, type } = req.body;

        pool.query(`INSERT INTO ${table} (name, uom, state, type) VALUES ($1, $2, $3, $4)`, [name, uom, state, type], (error, result) => {
            if (error) return res.status(400).json(error);
            res.status(200).json(true);
        });

    },
    update: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const { name, uom, state, type } = req.body;
        pool.query(
            `UPDATE ${table} SET name = $1, uom = $2, state = $3, type = $4 WHERE id = $5`,
            [name, parseInt(uom), parseInt(state), parseInt(type), id],
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