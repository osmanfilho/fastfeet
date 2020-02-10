import * as Yup from 'yup';
import Deviveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliverymanController {
  async index(req, res) {
    // const deviverymans = await Deviveryman.findAll();

    const deviverymans = await Deviveryman.findAll({
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(deviverymans);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const deviverymanExists = await Deviveryman.findOne({
      where: { email: req.body.email },
    });

    if (deviverymanExists) {
      return res.status(400).json({ error: 'Deviveryman already exists' });
    }

    const { id, name, email, avatar_id } = await Deviveryman.create(req.body);

    return res.json({
      id,
      name,
      email,
      avatar_id,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // const { email } = req.body;

    const deviveryman = await Deviveryman.findByPk(req.body.id);

    if (!deviveryman) {
      return res.status(400).json({ error: 'Deviveryman not found' });
    }

    // if (email !== recipient.email) {
    //   const recipientExists = await Recipient.findOne({ where: { email } });

    //   if (recipientExists) {
    //     return res.status(400).json({ error: 'Recipient already exists' });
    //   }
    // }

    const { id, name, email, avatar_id } = await deviveryman.update(req.body);

    return res.json({
      id,
      name,
      email,
      avatar_id,
    });
  }

  async delete(req, res) {
    return res.json();
  }
}

export default new DeliverymanController();
