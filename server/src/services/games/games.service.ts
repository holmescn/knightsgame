// Initializes the `games` service on path `/games`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Games } from './games.class';
import createModel from '../../models/games.model';
import hooks from './games.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'games': Games & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/games', new Games(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('games');

  service.hooks(hooks);
}
