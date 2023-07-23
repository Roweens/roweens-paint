const fs = require('fs');
const path = require('path');

class CanvasController {
    async getCanvas(req, res, next) {
        try {
            if (!req.query.id) {
                return res.status(500).json('no id');
            }

            const filePath = path.resolve(__dirname, '..', 'files', `${req.query.id}.jpg`);

            if (fs.existsSync(filePath)) {
                const file = fs.readFileSync(path.resolve(filePath));
                const data = `data:image/png;base64,${file.toString('base64')}`;
                return res.status(200).json(data);
            } else {
                fs.writeFileSync(path.resolve(filePath), '', 'base64');
                return res.status(200).json({ message: 'Файл создаг' });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json('error');
        }
    }
    async saveCanvas(req, res, next) {
        try {
            const data = req.body.img.replace(`data:image/png;base64,`, '');
            fs.writeFileSync(
                path.resolve(__dirname, '..', 'files', `${req.body.id}.jpg`),
                data,
                'base64'
            );
            return res.status(200).json({ message: 'Загружено' });
        } catch (error) {
            console.log(error);
            return res.status(500).json('error');
        }
    }
}

module.exports = new CanvasController();
