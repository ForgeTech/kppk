export enum BUILD_TYPE_ENUM {
  'building_construction' = 'building_construction',
  'prefabricated_house' = 'prefabricated_house',
};

export enum POWER_SUPPLY_CALCULATION_TYPE_ENUM {
  'estimate' = 'estimate',
  'custom' = 'custom',
  'exact_entry' = 'exact_entry',
};

export enum POWER_SUPPLY_POWER_TYPE_ENUM {
  'austria_common_energy_mix' = 'austria_common_energy_mix',
  'austria_green_power_mix' = 'austria_green_power_mix',
};


export enum HEAT_SUPPLY_CALCULATION_TYPE_ENUM {
  'estimate' = 'estimate',
  'custom' = 'custom',
  'exact_entry' = 'exact_entry',
};

export enum HOST_ROUTES {
    ROOT = '',
    CALC = 'react_view_calc',
    HOME = 'react_view_home',
    LOGIN = 'react_view_login',
    IMPRINT = 'react_view_imprint',
    DATA_PROTECTION = 'react_view_data_protection',
    WILDCARD = '**',
}

export enum REACT_ACTOR_ENUM {
  FG_AUTH_LOCAL = 'fg_auth_local',
  FG_SPINNER = 'fg_spinner',
  FG_TICK = 'fg_tick',
  FG_UI_DISPLAY_MODE = 'fg_ui_display_mode',
  FG_UI_SCHEME_THEME = 'fg_ui_scheme_theme',
  FG_UI = 'fg_ui',
  REACT_INIT = 'react_init',
  REACT_MAIN = 'react_main',
  REACT_RECOVERY = 'react_recovery',
  REACT_RUNNING = 'react_running',
  REACT_RUNNING_ADMIN_TOOLBAR = 'react_running_admin_toolbar',
  REACT_RUNNING_NAVIGATION = 'react_running_navigation',
  REACT_VIEW_HOME = 'react_view_home',
  REACT_VIEW_CALCULATION = 'react_view_calculation',
}

export enum react_view_calculation_form_name_enum {
    unnamed = 'unnamed',
    construction_site = 'construction_site',
    window = 'window',
    concrete = 'concrete',
    material = 'material',
    container_village = 'container_village',
    demolish_disposal = 'demolish_disposal',
    excavation_pit = 'excavation_pit',
    heating_system = 'heating_system',
    common = 'common',
    step_selection = 'step_selection',
  }

  export enum JET_BLASTING_PROCESS_CYLINDER_SHAPE_ENUM {
    'full_circle' = 'full_circle',
    'half_circle' = 'half_circle',
    'quater_circle' = 'quater_circle',
  }
  
  export enum JET_BLASTING_PROCESS_TYPE_ENUM {
    'process_type_cylinder' = 'process_type_cylinder',
    'process_type_cuboid' = 'process_type_cuboid',
  }
  
  export enum EXCAVATION_PIT_SECURITY_METHODE_ENUM {
    'foundation_pile' = 'foundation_pile',
    'sheet_pile_wall' = 'sheet_pile_wall',
    'escarpment' = 'escarpment',
    'shotcrete' = 'shotcrete',
    'jet_blasting' = 'jet_blasting',
  }

  export enum WINDOW_PART_TYPE_ENUM {
    none = 'window_part_type_enum_none',
    glass = 'window_part_type_enum_glass',
    frame = 'window_part_type_enum_frame',
  }