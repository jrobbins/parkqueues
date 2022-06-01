import logging
import os


UNIT_TEST_MODE = os.environ['SERVER_SOFTWARE'].startswith('test')

if not UNIT_TEST_MODE:
  # Py3 defaults to level WARN.
  logging.basicConfig(level=logging.INFO)


