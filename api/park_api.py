import logging
from api import basehandlers

from parkdata import disneylandca
from parkdata import disneycaliforniaadventure
from parkdata import greatamerica


PARKS = {
  'disneylandca': disneylandca.PARK,
  'disneycaliforniaadventure': disneycaliforniaadventure.PARK,
  'greatamerica': greatamerica.PARK,
}

MISSING_PARK = {
  'error': 'Park not found'
}


class ParkAPI(basehandlers.APIHandler):

  def do_get(self, park_uid):
    return PARKS.get(park_uid, MISSING_PARK)
