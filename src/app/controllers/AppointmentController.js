import * as Yup from 'yup';

import Appointment from '../models/Appointment';
import User from '../models/User';

class AppointmentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      date: Yup.date().required(),
      provider_id: Yup.number().required(),
      canceled_at: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { date, provider_id } = req.body;

    const isProvider = User.findOne({ where: provider_id, provider: true });

    if (!isProvider) {
      return res
        .status(401)
        .json({ error: 'You can only create appointment with providers' });
    }

    const appointment = await Appointment.create({
      date,
      provider_id,
      user_id: req.userId,
    });

    return res.json({ appointment });
  }
}

export default new AppointmentController();
