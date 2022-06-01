import logging
from api import basehandlers

WORLD = [
  {"regionName": "California",
   "parks": [
     {"name": "Disneyland", "uid": "disneylandca"},
     {"name": "Disney California Adventure"},
     {"name": "Magic Mountain", "disabled": True},
     {"name": "Knotts Berry Farm", "disabled": True},
     {"name": "Legoland CA", "disabled": True},
     {"name": "Universal Studios CA", "disabled": True},
     {"name": "Great America"}
     ]
  },
  {"regionName": "Florida",
   "parks": [
     {"name": "Magic Kingdom", "disabled": True},
     {"name": "EPCOT", "disabled": True},
     {"name": "Disney's Hollywood Studios", "disabled": True},
     {"name": "Disney's Animal Kingdom", "disabled": True},
     {"name": "Legoland FL", "disabled": True},
     {"name": "Universal Studios FL", "disabled": True}
     ]
  },
  {"regionName": "Japan",
   "parks": [
     {"name": "Disneyland JP", "disabled": True},
     {"name": "Disneysea", "disabled": True}
     ]
  },
  {"regionName": "France",
   "parks": [
     {"name": "Disneyland Paris", "disabled": True},
     {"name": "Walt Disney Studios", "disabled": True}
     ]
  },
  {"regionName": "Hong Kong",
   "parks": [
     {"name": "Disneyland Hong Kong", "disabled": True}
     ]
 },
  {"regionName": "England",
   "parks": [
     {"name": "Legoland Windsor", "disabled": True}
     ]
  },
  {"regionName": "Denmark",
   "parks": [
     {"name": "Legoland Billund", "disabled": True}
     ]
  },
  {"regionName": "Germany",
   "parks": [
     {"name": "Legoland Deutschland", "disabled": True}
     ]
  },
  {"regionName": "Malaysia",
   "parks": [
     {"name": "Legoland Malaysia", "disabled": True}
     ]
   },
]



class ParksAPI(basehandlers.APIHandler):

  def do_get(self):
    return {
      'world': WORLD,
      }
