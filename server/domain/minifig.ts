export interface Minifing {
  num_parts: number;
  last_modified_dt: string;
  name: string;
  set_img_url: string;
  set_num: string;
  set_url: string;
}

export interface MinifingPart {
  id: number;
  inv_part_id: number;
  part: {
    part_num: string;
    name: string;
    part_cat_id: number;
    part_url: string;
    part_img_url: string;
    external_ids: Record<string, number[]>;
    print_of: string | null;
  };
  color: {
    id: number;
    name: string;
    rgb: string;
    is_trans: boolean;
    external_ids: {
      [key: string]: {
        ext_ids: number[];
        ext_descrs: string[][];
      };
    };
  };
  set_num: string;
  quantity: number;
  is_spare: boolean;
  element_id: string;
  num_sets: number;
}
