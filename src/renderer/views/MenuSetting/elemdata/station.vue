<template>
  <v-layout>
    <v-tabs v-model="tab" vertical center-active color="light-green darken-1">
      <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
      
      
      <v-tab-item>
        <v-card>
          <v-card-title>
            North American Regional VFSP-WAS Demo - Multi-Model Forecast
            Ensemble
          </v-card-title>

          <v-card-subtitle> Multi-Model ensemble </v-card-subtitle>

          <v-container fluid>
            <v-row align="center" justify="center">
              <v-card width="45%">
                <v-img
                  alt="GIF 1"
                  class="shrink mr-2"
                  contain
                  src="../assets/gifs/composite_20200207T12Z+1-46h_northAmerica_lcc_Avg.gif"
                  transition="scale-transition"
                  width="800"
                />
              </v-card>
              <v-card width="45%">
                <v-img
                  alt="GIF 2"
                  class="shrink mr-2"
                  contain
                  src="../assets/gifs/composite_20200207T12Z+1-46h_northAmerica_lcc_Ext.gif"
                  transition="scale-transition"
                  width="800"
                />
              </v-card>
            </v-row>
            <v-row align="center" justify="center">
              <v-card width="45%">
                <v-img
                  alt="GIF 1"
                  class="shrink mr-2"
                  contain
                  src="../assets/gifs/composite_20200207T12Z+1-46h_northAmerica_lcc_Med.gif"
                  transition="scale-transition"
                  width="800"
                />
              </v-card>
              <v-card width="45%">
                <v-img
                  alt="GIF 2"
                  class="shrink mr-2"
                  contain
                  src="../assets/gifs/composite_20200207T12Z+1-46h_northAmerica_lcc_StDev.gif"
                  transition="scale-transition"
                  width="800"
                />
              </v-card>
            </v-row>
          </v-container>

          <v-card-text>
            The animations show a forecast of up to 48 hours at 3-hourly
            intervals. The multi-model products have been generated from various
            atmospheric chemical and/or aerosol transport models which are
            represented using a common geographical domain and spatial
            resolution. There are two products describing centrality
            (multi-model median and mean) and two products describing the spread
            (standard deviation and range of variation). The multi-model
            ensemble regional members are ECCC FireWork and NOAA NCEP NAQFC. The
            global members are ECMWF IFS CAMS, FMI SILAM, JMA MASINGAR and NASA
            GEOS-FP. It is important to note that different models may have very
            different characteristics (e.g. global or regional models,
            horizontal and vertical resolutions, smoke emission characteristics,
            physics and chemistry parameterisations, presence or absence of
            smoke assimilation, feedback to the meteorological model etc.) In
            addition, some of these predictions are experimental or produced for
            research purposes only. Information on the various models’
            configuration can be found on their respective websites and in the
            literature.
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card>
          <v-card-title>
            North American Regional VFSP-WAS Demo - Individual Models
          </v-card-title>

          <v-container fluid>
            <v-row align="center" justify="center">
              <v-card width="45%">
                <v-img
                  alt="GIF 1"
                  class="shrink mr-2"
                  contain
                  src="../assets/gifs/RAQDPS_20200207T12Z+1-46h_northAmerica_lcc_AF.gif"
                  transition="scale-transition"
                  width="800"
                />
              </v-card>
              <v-card width="45%">
                <v-img
                  alt="GIF 2"
                  class="shrink mr-2"
                  contain
                  src="../assets/gifs/CMAQ_20200207T12Z+1-46h_northAmerica_lcc_Band1.gif"
                  transition="scale-transition"
                  width="800"
                />
              </v-card>
            </v-row>
            <v-row align="center" justify="center">
              <v-card width="45%">
                <v-img
                  alt="GIF 1"
                  class="shrink mr-2"
                  contain
                  src="../assets/gifs/CAMS_20200207T12Z+1-46h_northAmerica_lcc_Band1.gif"
                  transition="scale-transition"
                  width="800"
                />
              </v-card>
              <v-card width="45%">
                <v-img
                  alt="GIF 2"
                  class="shrink mr-2"
                  contain
                  src="../assets/gifs/GEOS_20200207T12Z+1-46h_northAmerica_lcc_Band1.gif"
                  transition="scale-transition"
                  width="800"
                />
              </v-card>
            </v-row>

            <v-row align="center" justify="center">
              <v-card>
                <v-img
                  alt="GIF 1"
                  class="shrink mr-2"
                  contain
                  src="../assets/gifs/SILAM_20200207T12Z+1-46h_northAmerica_lcc_Band1.gif"
                  transition="scale-transition"
                  width="800"
                />
              </v-card>
            </v-row>
          </v-container>

          <v-card-text>
            <p>
              The animations show a forecast of up to 48 hours at 3-hourly
              intervals.
            </p>
            <br />
            <p>
              The individual products have been generated from various
              atmospheric chemical and/or aerosol transport models which are
              represented using a common geographical domain and spatial
              resolution.
            </p>
            <br />
            <p>
              There are two products describing centrality (multi-model median
              and mean) and two products describing the spread (standard
              deviation and range of variation).
            </p>
            <br />
            <p>
              The multi-model ensemble regional members are ECCC FireWork and
              NOAA NCEP NAQFC. The global members are ECMWF IFS CAMS, FMI SILAM,
              JMA MASINGAR and NASA GEOS-FP.
            </p>
            <br />
            <p>
              It is important to note that different models may have very
              different characteristics (e.g. global or regional models,
              horizontal and vertical resolutions, smoke emission
              characteristics, physics and chemistry parameterisations, presence
              or absence of smoke assimilation, feedback to the meteorological
              model etc.) In addition, some of these predictions are
              experimental or produced for research purposes only. Information
              on the various models’ configuration can be found on their
              respective websites and in the literature.
            </p>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card>
          <v-card-title>
            North American Regional VFSP-WAS Demo - PM2.5 Evaluation
          </v-card-title>

          <v-card-text>
            <p>
              Multi-Model ensemble members fine particulate matter
              concentrations forecasts are evaluated against observations from
              North American networks (AirNow, CAPMoN, NAPS, etc.).
            </p>

            <br />
            <p>
              <em class="warning"> Coming soon:&nbsp;</em>
              graphs with
              <a href="https://aqdb.cmc.ec.gc.ca/vaqum/">VAQUM</a> data. Talk
              with Yordan for
              <a href="http://iweb.cmc.ec.gc.ca/~afsurdv/PlotlyExp.html">
                his work this summer with Plotly.</a
              >
            </p>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card>
          <v-card-title>
            North American Regional VFSP-WAS Demo - ICAP Smoke AOD
          </v-card-title>

          <v-card-subtitle> ICAP Smoke Aerosol Optical Depth </v-card-subtitle>

          <v-container fluid>
            <v-row align="center" justify="center">
              <v-card width="45%">
                <v-img
                  alt="GIF 1"
                  class="shrink mr-2"
                  contain
                  src="../assets/gifs/icap_20200208T00Z+0-120H_smoke_aod_mean_northAmerica_lcc_Band1.gif"
                  transition="scale-transition"
                  width="800"
                />
              </v-card>
              <v-card width="45%">
                <v-img
                  alt="GIF 2"
                  class="shrink mr-2"
                  contain
                  src="../assets/gifs/icap_20200208T00Z+0-120H_smoke_aod_stdv_northAmerica_lcc_Band1.gif"
                  transition="scale-transition"
                  width="800"
                />
              </v-card>
            </v-row>
          </v-container>

          <v-card-text>
            The animations show a forecast of up to 120 hours at 6-hourly
            intervals. The International Cooperative for Aerosol Prediction
            (ICAP) is an international forum for aerosol forecast centres,
            remote sensing data providers and lead system developers to share
            best practices and discuss pressing issues facing the operational
            aerosol community. In the plots above, the ICAP Multi-Model Ensemble
            (MME) smoke aerosol optical depth (AOD) is used. This product is
            constructed from the following aerosol forecast systems: ECMWF CAMS,
            NASA GEOS-FP, NRL NAAPS, and JMA MASINGAR.
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card>
          <v-card-title>
            North American Regional VFSP-WAS Demo - Fire Danger Risk
          </v-card-title>

          <v-card-subtitle> Fire Danger Risk Map </v-card-subtitle>

          <v-container fluid>
            <v-row align="center" justify="center">
              <v-card>
                <v-img
                  alt="GIF 1"
                  class="shrink mr-2"
                  contain
                  src="../assets/img/fdr20200207.png"
                  transition="scale-transition"
                  width="800"
                />
              </v-card>
              <v-spacer></v-spacer>
              <v-card>
                <v-img
                  alt="GIF 2"
                  class="shrink mr-2"
                  contain
                  src="../assets/img/legend_fdr.jpg"
                  transition="scale-transition"
                  width="800"
                />
              </v-card>
            </v-row>
          </v-container>

          <v-card-text>
            <p>
              Fire Danger is a relative index of how easy it is to ignite
              vegetation, how difficult a fire may be to control, and how much
              damage a fire may do.
            </p>
            <br />
            <p>
              Note: These general fire descriptions apply to most coniferous
              forests. The national fire danger maps show conditions as
              classified by the provincial and territorial fire management
              agencies. Choice and interpretation of classes may vary between
              provinces. For fuel-specific fire behavior, consult the Fire
              Behavior Prediction maps.
            </p>
            <br />
            <a href="https://cwfis.cfs.nrcan.gc.ca/maps/fw?type=fdr">
              Link to NRCan source
            </a>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card>
          <v-card-title>
            North American Regional VFSP-WAS Demo - Fire Weather Index
          </v-card-title>

          <v-card-subtitle> Fire Weather Index Map </v-card-subtitle>

          <v-container fluid>
            <v-row align="center" justify="center">
              <v-card>
                <v-img
                  alt="GIF 1"
                  class="shrink mr-2"
                  contain
                  src="../assets/img/fwi-konstantinos.png"
                  transition="scale-transition"
                  width="800"
                />
              </v-card>
            </v-row>
          </v-container>

          <v-card-text>
            <p>
              The Fire Weather Index is a component of the Canadian Forest Fire
              Weather Index (FWI) System. It is a numeric rating of fire
              intensity. It combines the Initial Spread Index and the Buildup
              Index.
            </p>
            <p>
              The computation of FWI depends solely on meteorological
              conditions.
            </p>
            <ul style="margin-left: 2em">
              <li>
                <p>Noon temperature (Celsius)</p>
              </li>
              <li>
                <p>Noon relative humidity (%)</p>
              </li>
              <li>
                <p>
                  Accumulated Precipitation over the previous 24h, at noon (in
                  mm)
                </p>
              </li>
              <li>
                <p>Noon wind speed (km/h)</p>
              </li>
              <li>
                <p>
                  Previous days moisture fuel indices (Fine fuel, duff moisture,
                  and drought).
                </p>
              </li>
            </ul>
            <br />
            <p>
              It is suitable as a general index of fire danger throughout the
              forested areas of Canada.
            </p>
            <a href="https://cwfis.cfs.nrcan.gc.ca/maps/fw?type=fwi">
              Link to NRCan source
            </a>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card>
          <v-card-title>
            North American Regional VFSP-WAS Demo - Subseasonal Outlook
          </v-card-title>

          <v-card-subtitle> Subseasonal Outlook Map </v-card-subtitle>

          <v-container fluid>
            <v-row align="center" justify="center">
              <v-card width="45%">
                <v-img
                  alt="GIF 1"
                  class="shrink mr-2"
                  contain
                  src="../assets/img/2020022700_054_E1_canada_I_ANOMALY@PRECIPITATION_anomaly@probability@combined@672_768.png"
                  transition="scale-transition"
                  width="800"
                />
              </v-card>
              <v-card width="45%">
                <v-img
                  alt="GIF 1"
                  class="shrink mr-2"
                  contain
                  src="../assets/img/2020022700_054_E1_canada_I_ANOMALY@TEMPERATURE_anomaly@probability@combined@666_768.png"
                  transition="scale-transition"
                  width="800"
                />
              </v-card>
            </v-row>
          </v-container>

          <v-card-text>
            <p>
              The monthly forecast is updated each Thursday and covers the 28
              days starting on the following Monday.
            </p>
            <br />
            <p>
              The forecasted anomaly is produced from the average conditions
              forecasted over that period by the Global Ensemble Prediction
              System (GEPS).
            </p>
            <br />
            <p>
              A 20 year climatology (1998-2017) of this prediction system
              obtained from a reforecast is also used in the computation of the
              forecast anomaly.
            </p>
            <br />
            <a
              href="http://collaboration.cmc.ec.gc.ca/cmc/cmoi/product_guide/docs/tech_specifications/tech_specifications_GEPS_6.0.0_e.pdf"
              class="bluelink"
            >
              See the GEPS6.0.0 reforecast technical note
            </a>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <!-- <v-tab-item>
        <h3>Smoke Forecasts</h3>
        <v-tabs color="light-green darken-2">
            <v-tab>Smoke Aerosol Optical Depth</v-tab>
            <v-tab>PM<sub>10</sub> Surface Concentration</v-tab>
            <v-tab>PM<sub>2.5</sub> Surface Concentration</v-tab>

            <v-tab-item>
              <h4>Smoke Aerosol Optical Depth</h4>
            </v-tab-item>

            <v-tab-item>
              <h4>PM<sub>10</sub> Surface Concentration</h4>
            </v-tab-item>

            <v-tab-item>
              <h4>PM<sub>2.5</sub> Surface Concentration</h4>
            </v-tab-item>

        </v-tabs>
      </v-tab-item> -->

      <v-tab-item>
        <OpenLayersPlayroom />
      </v-tab-item>
    </v-tabs>
  </v-layout>
</template>

<script>
export default {
  components: {},

  data: function () {
    return {
      tab: null,
      items: ["厂站", "母线", "交流线", "并联电容/电抗器", "变压器", "负荷"],
      texts: [
        "checkcheckcheck",
        "savesavesave",
        "savesavesave",
        "savesavesave",
        "savesavesave",
        "savesavesave",
      ],
    };
  },

  methods: {
    getImgUrl: function (path) {
      return require("@/assets/" + path);
    },
  },
};
</script>