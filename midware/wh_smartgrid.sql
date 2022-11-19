SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `c1_branch_level`;
CREATE TABLE `c1_branch_level` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `bl_1` decimal(20,8) DEFAULT NULL,
  `bl_2` decimal(20,8) DEFAULT NULL,
  `bl_3` decimal(20,8) DEFAULT NULL,
  `bl_4` decimal(20,8) DEFAULT NULL,
  `bl_5` decimal(20,8) DEFAULT NULL,
  `bl_6` decimal(20,8) DEFAULT NULL,
  `bl_7` decimal(20,8) DEFAULT NULL,
  `bl_8` decimal(20,8) DEFAULT NULL,
  `bl_9` decimal(20,8) DEFAULT NULL,
  `bl_10` decimal(20,8) DEFAULT NULL,
  `bl_11` decimal(20,8) DEFAULT NULL,
  `bl_12` decimal(20,8) DEFAULT NULL,
  `bl_13` decimal(20,8) DEFAULT NULL,
  `proj_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=686848 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

DROP TABLE IF EXISTS `c1_branch_level_area`;
CREATE TABLE `c1_branch_level_area` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `bla_1` decimal(20,8) DEFAULT NULL,
  `bla_2` decimal(20,8) DEFAULT NULL,
  `bla_3` decimal(20,8) DEFAULT NULL,
  `bla_4` decimal(20,8) DEFAULT NULL,
  `bla_5` decimal(20,8) DEFAULT NULL,
  `bla_6` decimal(20,8) DEFAULT NULL,
  `bla_7` decimal(20,8) DEFAULT NULL,
  `bla_8` decimal(20,8) DEFAULT NULL,
  `bla_9` decimal(20,8) DEFAULT NULL,
  `bla_10` decimal(20,8) DEFAULT NULL,
  `bla_11` decimal(20,8) DEFAULT NULL,
  `bla_12` decimal(20,8) DEFAULT NULL,
  `bla_13` decimal(20,8) DEFAULT NULL,
  `proj_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=686896 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

DROP TABLE IF EXISTS `c1_bus_level`;
CREATE TABLE `c1_bus_level` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `bl_1` decimal(20,8) DEFAULT NULL,
  `bl_2` decimal(20,8) DEFAULT NULL,
  `bl_3` decimal(20,8) DEFAULT NULL,
  `bl_4` decimal(20,8) DEFAULT NULL,
  `bl_5` decimal(20,8) DEFAULT NULL,
  `bl_6` decimal(20,8) DEFAULT NULL,
  `bl_7` decimal(20,8) DEFAULT NULL,
  `bl_8` decimal(20,8) DEFAULT NULL,
  `bl_9` decimal(20,8) DEFAULT NULL,
  `bl_10` decimal(20,8) DEFAULT NULL,
  `bl_11` decimal(20,8) DEFAULT NULL,
  `bl_12` decimal(20,8) DEFAULT NULL,
  `bl_13` decimal(20,8) DEFAULT NULL,
  `proj_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=683103 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

DROP TABLE IF EXISTS `c1_bus_level_area`;
CREATE TABLE `c1_bus_level_area` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `bla_1` decimal(20,8) DEFAULT NULL,
  `bla_2` decimal(20,8) DEFAULT NULL,
  `bla_3` decimal(20,8) DEFAULT NULL,
  `bla_4` decimal(20,8) DEFAULT NULL,
  `bla_5` decimal(20,8) DEFAULT NULL,
  `bla_6` decimal(20,8) DEFAULT NULL,
  `bla_7` decimal(20,8) DEFAULT NULL,
  `bla_8` decimal(20,8) DEFAULT NULL,
  `bla_9` decimal(20,8) DEFAULT NULL,
  `bla_10` decimal(20,8) DEFAULT NULL,
  `bla_11` decimal(20,8) DEFAULT NULL,
  `bla_12` decimal(20,8) DEFAULT NULL,
  `bla_13` decimal(20,8) DEFAULT NULL,
  `proj_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=683133 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

DROP TABLE IF EXISTS `c1_component_relibility`;
CREATE TABLE `c1_component_relibility` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `cr_1` decimal(20,8) DEFAULT NULL,
  `cr_2` decimal(20,8) DEFAULT NULL,
  `proj_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=689404 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

DROP TABLE IF EXISTS `c1_generator_level`;
CREATE TABLE `c1_generator_level` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `gl_1` decimal(20,8) DEFAULT NULL,
  `gl_2` decimal(20,8) DEFAULT NULL,
  `gl_3` decimal(20,8) DEFAULT NULL,
  `gl_4` decimal(20,8) DEFAULT NULL,
  `gl_5` decimal(20,8) DEFAULT NULL,
  `gl_6` decimal(20,8) DEFAULT NULL,
  `gl_7` decimal(20,8) DEFAULT NULL,
  `gl_8` decimal(20,8) DEFAULT NULL,
  `gl_9` decimal(20,8) DEFAULT NULL,
  `gl_10` decimal(20,8) DEFAULT NULL,
  `gl_11` decimal(20,8) DEFAULT NULL,
  `gl_12` decimal(20,8) DEFAULT NULL,
  `gl_13` decimal(20,8) DEFAULT NULL,
  `gl_14` decimal(20,8) DEFAULT NULL,
  `gl_15` decimal(20,8) DEFAULT NULL,
  `gl_16` decimal(20,8) DEFAULT NULL,
  `gl_17` decimal(20,8) DEFAULT NULL,
  `gl_18` decimal(20,8) DEFAULT NULL,
  `gl_19` decimal(20,8) DEFAULT NULL,
  `gl_20` decimal(20,8) DEFAULT NULL,
  `gl_21` decimal(20,8) DEFAULT NULL,
  `proj_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=686902 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

DROP TABLE IF EXISTS `c1_generator_level_area`;
CREATE TABLE `c1_generator_level_area` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `gla_1` decimal(20,8) DEFAULT NULL,
  `gla_2` decimal(20,8) DEFAULT NULL,
  `gla_3` decimal(20,8) DEFAULT NULL,
  `gla_4` decimal(20,8) DEFAULT NULL,
  `gla_5` decimal(20,8) DEFAULT NULL,
  `gla_6` decimal(20,8) DEFAULT NULL,
  `gla_7` decimal(20,8) DEFAULT NULL,
  `gla_8` decimal(20,8) DEFAULT NULL,
  `gla_9` decimal(20,8) DEFAULT NULL,
  `gla_10` decimal(20,8) DEFAULT NULL,
  `gla_11` decimal(20,8) DEFAULT NULL,
  `gla_12` decimal(20,8) DEFAULT NULL,
  `gla_13` decimal(20,8) DEFAULT NULL,
  `gla_14` decimal(20,8) DEFAULT NULL,
  `gla_15` decimal(20,8) DEFAULT NULL,
  `gla_16` decimal(20,8) DEFAULT NULL,
  `gla_17` decimal(20,8) DEFAULT NULL,
  `gla_18` decimal(20,8) DEFAULT NULL,
  `gla_19` decimal(20,8) DEFAULT NULL,
  `gla_20` decimal(20,8) DEFAULT NULL,
  `gla_21` decimal(20,8) DEFAULT NULL,
  `proj_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=686908 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

DROP TABLE IF EXISTS `c1_load_level_area`;
CREATE TABLE `c1_load_level_area` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `lla_1` decimal(20,8) DEFAULT NULL,
  `lla_2` decimal(20,8) DEFAULT NULL,
  `lla_3` decimal(20,8) DEFAULT NULL,
  `proj_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=689321 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

DROP TABLE IF EXISTS `c1_name_show_level_area`;
CREATE TABLE `c1_name_show_level_area` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nsla_k` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `nsla_v` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `nsla_index` int DEFAULT NULL,
  `proj_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=687059 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

DROP TABLE IF EXISTS `c1_table_nodes_level_province_area`;
CREATE TABLE `c1_table_nodes_level_province_area` (
  `id` bigint NOT NULL,
  `proj_id` bigint DEFAULT NULL,
  `v1` decimal(20,8) DEFAULT NULL,
  `v2` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `v3` decimal(20,8) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

DROP TABLE IF EXISTS `coh_compute_result`;
CREATE TABLE `coh_compute_result` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `task_id` bigint DEFAULT NULL,
  `proj_id` bigint DEFAULT NULL,
  `best_case` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `input_data_best` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `case_output_best` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=689424 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

DROP TABLE IF EXISTS `cpf_compute_result`;
CREATE TABLE `cpf_compute_result` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `proj_id` bigint DEFAULT NULL,
  `task_id` bigint DEFAULT NULL,
  `base_mva` decimal(20,8) DEFAULT NULL,
  `bus` text CHARACTER SET utf8 COLLATE utf8_general_ci,
  `branch` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `gen` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `success` tinyint DEFAULT NULL,
  `et` decimal(20,8) DEFAULT NULL,
  `bus_name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `branch_fname` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `branch_tname` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `gen_name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=689405 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

DROP TABLE IF EXISTS `crisk_compute_result`;
CREATE TABLE `crisk_compute_result` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `proj_id` bigint DEFAULT NULL,
  `task_id` bigint DEFAULT NULL,
  `mfs` decimal(20,8) DEFAULT NULL,
  `eo` decimal(20,8) DEFAULT NULL,
  `mhvs` decimal(20,8) DEFAULT NULL,
  `mlvs` decimal(20,8) DEFAULT NULL,
  `ehvv` decimal(20,8) DEFAULT NULL,
  `elvv` decimal(20,8) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=689422 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

DROP TABLE IF EXISTS `ctopo_compute_result`;
CREATE TABLE `ctopo_compute_result` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `proj_id` bigint DEFAULT NULL,
  `task_id` bigint DEFAULT NULL,
  `nodes_type` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `bus_maintance_sets_3d` longtext CHARACTER SET utf8 COLLATE utf8_general_ci,
  `branch_maintance_sets_3d` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `gen_maintance_sets_3d` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `branch_type` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `branch_numbers` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `num_topo_maintance` int DEFAULT NULL,
  `flag_connect` int DEFAULT NULL,
  `case_output` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `interrup_nodes_counterbusname` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=689406 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

DROP TABLE IF EXISTS `cweak_compute_result`;
CREATE TABLE `cweak_compute_result` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `task_id` bigint DEFAULT NULL,
  `proj_id` bigint DEFAULT NULL,
  `weak_load` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `weak_voltage` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=689409 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

DROP TABLE IF EXISTS `hibernate_sequence`;
CREATE TABLE `hibernate_sequence` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

DROP TABLE IF EXISTS `p_acline_info`;
CREATE TABLE `p_acline_info` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `proj_id` bigint DEFAULT NULL,
  `l_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `j_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `id_no` int DEFAULT NULL,
  `r1` decimal(9,6) DEFAULT NULL,
  `x1` decimal(9,6) DEFAULT NULL,
  `b1_half` decimal(9,6) DEFAULT NULL,
  `rate_ka` decimal(9,5) DEFAULT NULL,
  `up_limit` varchar(9) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `flag` int DEFAULT NULL,
  `a_time` datetime DEFAULT NULL,
  `id_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `pl` decimal(19,2) DEFAULT NULL,
  `ql` decimal(19,2) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=409489 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC COMMENT='交流线表';

DROP TABLE IF EXISTS `p_acline_trend_info`;
CREATE TABLE `p_acline_trend_info` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `proj_id` bigint DEFAULT NULL,
  `i_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `j_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `id_no` int DEFAULT NULL,
  `valid` int DEFAULT NULL,
  `nt_type` int DEFAULT NULL,
  `flag` int DEFAULT NULL,
  `a_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1117665 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC COMMENT='潮流作业-交流线表';

DROP TABLE IF EXISTS `p_alternator_info`;
CREATE TABLE `p_alternator_info` (
  `id` int NOT NULL AUTO_INCREMENT,
  `proj_id` bigint DEFAULT NULL,
  `id_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `flag` int DEFAULT NULL,
  `a_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=61321 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC COMMENT='发电机表';

DROP TABLE IF EXISTS `p_alternator_result_info`;
CREATE TABLE `p_alternator_result_info` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `proj_id` bigint DEFAULT NULL,
  `alternator_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '发电机名称',
  `moline_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '母线名',
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '类型',
  `active_power_generation` decimal(9,4) DEFAULT NULL COMMENT '有功发电',
  `reactive_power_generation` decimal(9,4) DEFAULT NULL COMMENT '无功发电',
  `flag` int DEFAULT NULL,
  `a_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=41281 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC COMMENT='潮流结果-发电机';

DROP TABLE IF EXISTS `p_alternator_trend_info`;
CREATE TABLE `p_alternator_trend_info` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `proj_id` bigint DEFAULT NULL,
  `id_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `valid` int DEFAULT NULL,
  `v0` decimal(9,5) DEFAULT NULL,
  `angle` decimal(9,5) DEFAULT NULL,
  `qmax` decimal(9,4) DEFAULT NULL,
  `qmin` decimal(9,4) DEFAULT NULL,
  `pmax` decimal(9,4) DEFAULT NULL,
  `pmin` decimal(9,4) DEFAULT NULL,
  `flag` int DEFAULT NULL,
  `a_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=60591 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC COMMENT='潮流作业库-发电机表';

DROP TABLE IF EXISTS `p_component_branch_info`;
CREATE TABLE `p_component_branch_info` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `proj_id` bigint DEFAULT NULL,
  `serial_number` int DEFAULT NULL,
  `name` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `first_node` int DEFAULT NULL,
  `last_node` int DEFAULT NULL,
  `type` int DEFAULT NULL,
  `run_state` int DEFAULT NULL,
  `flag` int DEFAULT NULL,
  `a_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3726 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC COMMENT='元键支路';

DROP TABLE IF EXISTS `p_component_reliability_info`;
CREATE TABLE `p_component_reliability_info` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `proj_id` bigint DEFAULT NULL,
  `branch_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `failure_rate` decimal(10,3) DEFAULT NULL,
  `repair_time` decimal(11,3) DEFAULT NULL,
  `flag` int DEFAULT NULL,
  `a_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=415 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC COMMENT='元件可靠性';

DROP TABLE IF EXISTS `p_load_trend_info`;
CREATE TABLE `p_load_trend_info` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `proj_id` bigint DEFAULT NULL,
  `id_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `node_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `pl` decimal(9,6) DEFAULT NULL,
  `ql` decimal(9,6) DEFAULT NULL,
  `flag` int DEFAULT NULL,
  `a_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=140603 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC COMMENT='潮流作业-负荷表';

DROP TABLE IF EXISTS `p_moline_info`;
CREATE TABLE `p_moline_info` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `bus_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `phy_pos` tinyint DEFAULT NULL,
  `zone_no` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `ps_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `base_kv` decimal(16,4) DEFAULT NULL,
  `vmax_kv` decimal(16,4) DEFAULT NULL,
  `vmin_kv` decimal(16,4) DEFAULT NULL,
  `sc1_mva` decimal(16,4) DEFAULT NULL,
  `sc3_mva` decimal(16,4) DEFAULT NULL,
  `hasnode` tinyint DEFAULT NULL,
  `bustype` tinyint DEFAULT NULL,
  `dispname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `proj_id` bigint DEFAULT NULL,
  `flag` tinyint NOT NULL DEFAULT '0',
  `a_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=803881 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC COMMENT='母线表';

DROP TABLE IF EXISTS `p_repaire_task`;
CREATE TABLE `p_repaire_task` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `station_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '场站code',
  `station_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '场站名称',
  `base_kv` decimal(10,2) DEFAULT NULL COMMENT '电压值',
  `proj_id` bigint DEFAULT NULL,
  `flag` tinyint NOT NULL DEFAULT '0',
  `computing` tinyint NOT NULL DEFAULT '0' COMMENT '0:创建;1:计算中;2:计算成功',
  `in_station` tinyint DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

DROP TABLE IF EXISTS `p_station_info`;
CREATE TABLE `p_station_info` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `ps_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `stat_type` tinyint DEFAULT NULL,
  `zone_no` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `longitude` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `latitude` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `proj_id` bigint DEFAULT NULL,
  `flag` tinyint NOT NULL DEFAULT '0',
  `a_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

DROP TABLE IF EXISTS `p_threew_transformer_info`;
CREATE TABLE `p_threew_transformer_info` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `proj_id` bigint DEFAULT NULL,
  `name_1` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `name_2` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `name_3` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `tap1` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `tap2` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `tap3` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `flag` int DEFAULT NULL,
  `a_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=182029 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC COMMENT='三绕组变压器表\n';

DROP TABLE IF EXISTS `p_threew_transformer_info_info`;
CREATE TABLE `p_threew_transformer_info_info` (
  `id` bigint NOT NULL,
  `a_time` datetime DEFAULT NULL,
  `flag` int DEFAULT NULL,
  `name_1` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `name_2` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `name_3` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `proj_id` bigint DEFAULT NULL,
  `tap1` decimal(19,2) DEFAULT NULL,
  `tap2` decimal(19,2) DEFAULT NULL,
  `tap3` decimal(19,2) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

DROP TABLE IF EXISTS `p_threew_transformer_result_info`;
CREATE TABLE `p_threew_transformer_result_info` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `proj_id` bigint DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '三绕组变压器名称',
  `side_bus1` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '1侧母线',
  `side_bus2` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `side_bus3` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `active_power_generation1` decimal(9,4) DEFAULT NULL,
  `reactive_power_generation1` decimal(9,4) DEFAULT NULL,
  `active_power_generation2` decimal(9,4) DEFAULT NULL,
  `reactive_power_generation2` decimal(9,4) DEFAULT NULL,
  `active_power_generation3` decimal(9,4) DEFAULT NULL,
  `reactive_power_generation3` decimal(9,4) DEFAULT NULL,
  `flag` int DEFAULT NULL,
  `a_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=140057 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC COMMENT='潮流结果-三绕组变压器';

DROP TABLE IF EXISTS `p_tw_transformer_info`;
CREATE TABLE `p_tw_transformer_info` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `proj_id` bigint DEFAULT NULL,
  `l_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `j_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `v0_tap1` decimal(9,4) DEFAULT NULL,
  `v0_tap2` decimal(9,4) DEFAULT NULL,
  `flag` int DEFAULT NULL,
  `a_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=70477 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC COMMENT='两绕组变压器表';

DROP TABLE IF EXISTS `p_tw_transformer_result_info`;
CREATE TABLE `p_tw_transformer_result_info` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `proj_id` bigint DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '两小组变压器名称',
  `j_cmx` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT 'j侧母线',
  `c_active_power_generation` decimal(9,4) DEFAULT NULL COMMENT '侧有功',
  `c_reactive_power_generation` decimal(9,4) DEFAULT NULL COMMENT '测无功',
  `flag` int DEFAULT NULL,
  `a_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=51917 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC COMMENT='潮流结果-两晓组变压器';

DROP TABLE IF EXISTS `project_info`;
CREATE TABLE `project_info` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `info` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `a_time` datetime DEFAULT NULL,
  `flag` tinyint NOT NULL DEFAULT '0',
  `is_import` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

DROP TABLE IF EXISTS `project_params`;
CREATE TABLE `project_params` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `proj_id` bigint DEFAULT NULL COMMENT '工程id',
  `param_v` decimal(16,2) DEFAULT NULL,
  `a_time` datetime DEFAULT NULL,
  `flag` tinyint NOT NULL DEFAULT '0',
  `param_k` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=208 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

DROP TABLE IF EXISTS `sys_admin`;
CREATE TABLE `sys_admin` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `pwd` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `info` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `a_time` datetime DEFAULT NULL,
  `flag` tinyint NOT NULL DEFAULT '0',
  `type` char(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '10',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

DROP TABLE IF EXISTS `task_loadflow_info`;
CREATE TABLE `task_loadflow_info` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `info` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `method` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `allow_err` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `iterate_limit` int DEFAULT NULL,
  `a_time` datetime DEFAULT NULL,
  `flag` tinyint NOT NULL DEFAULT '0',
  `proj_id` bigint DEFAULT NULL,
  `computing` tinyint NOT NULL DEFAULT '0' COMMENT '0:创建\n1:计算中\n2:计算成功\n3:计算失败',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

DROP TABLE IF EXISTS `task_overhaul`;
CREATE TABLE `task_overhaul` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `proj_id` bigint DEFAULT NULL,
  `a_time` datetime DEFAULT NULL,
  `flag` tinyint NOT NULL DEFAULT '0',
  `computing` tinyint NOT NULL DEFAULT '0',
  `topo_id` bigint DEFAULT NULL,
  `topo_method` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

DROP TABLE IF EXISTS `task_risk_assess`;
CREATE TABLE `task_risk_assess` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `proj_id` bigint DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `topo_id` bigint DEFAULT NULL,
  `a_time` datetime DEFAULT NULL,
  `flag` tinyint DEFAULT '0',
  `computing` tinyint NOT NULL DEFAULT '0',
  `topo_method` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=159 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

DROP TABLE IF EXISTS `task_station_topo`;
CREATE TABLE `task_station_topo` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `fix_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `a_time` datetime DEFAULT NULL,
  `flag` tinyint NOT NULL DEFAULT '0',
  `proj_id` bigint DEFAULT NULL,
  `computing` tinyint NOT NULL DEFAULT '0' COMMENT '0:创建\n1:计算中\n2:计算成功\n3:计算失败',
  `topo_list` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `node_list` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

DROP TABLE IF EXISTS `task_weak_info`;
CREATE TABLE `task_weak_info` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `proj_id` bigint DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `a_time` datetime DEFAULT NULL,
  `flag` tinyint DEFAULT '0',
  `computing` tinyint NOT NULL DEFAULT '0',
  `topo_id` bigint DEFAULT NULL,
  `topo_method` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=107 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO `wh_smartgrid`.`sys_admin` (`id`, `user`, `pwd`, `name`, `info`, `a_time`, `flag`, `type`) VALUES (1, 'admin', '123456', '管理员', '管理员', '2022-03-02 16:20:38', 0, '00');