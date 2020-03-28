import * as fontawesome from "./vendor/fontawesome";
import * as heroicons from "./vendor/heroicons";
import * as feathericons from "./vendor/feathericons";
import * as linearicons from "./vendor/linearicons";
import * as dripicons from "./vendor/dripicons";
import * as lineawesome from "./vendor/lineawesome";
import * as ikonate from "./vendor/ikonate";
import * as remixicon from "./vendor/remixicon";

export function generate(req: IconRequest): Promise<string> {
  if (req.vendor === 'fontawesome') {
    return fontawesome.generate(req);
  }

  if (req.vendor === 'heroicons') {
    return heroicons.generate(req);
  }

  if (req.vendor === 'feathericons') {
    return feathericons.generate(req);
  }

  if (req.vendor === 'linearicons') {
    return linearicons.generate(req);
  }

  if (req.vendor === 'dripicons') {
    return dripicons.generate(req);
  }

  if (req.vendor === 'lineawesome') {
    return lineawesome.generate(req);
  }

  if (req.vendor === 'ikonate') {
    return ikonate.generate(req);
  }

  if (req.vendor === 'remixicon') {
    return remixicon.generate(req);
  }

  throw "Unknown icon vendor";
}