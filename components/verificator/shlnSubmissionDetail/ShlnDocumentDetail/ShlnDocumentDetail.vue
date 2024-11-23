<script setup lang="ts">
const props = defineProps({
  datadocumentloa: {
    type: Object,
    required: true,
  },
  datadocumentfhc: {
    type: Object,
    required: true,
  },
  loadingdocumentmra: {
    type: Object,
    required: true,
  },
});

const {
  authorized_company,
  authorizer_company,
  date,
  id,
  letter_no,
  loa_document,
} = props.datadocumentloa || {};

const { country, expired_date, halal_institution_name, issued_date } =
  props.loadingdocumentmra || {};

const { document, document_no, verification_link, file } =
  props.datadocumentfhc || {};

const MRA = [
  { id: 1, key: "Halal Institution Name", value: halal_institution_name },
  { id: 2, key: "Issued Date", value: issued_date },
  { id: 3, key: "Expired Date", value: expired_date },
  { id: 4, key: "Country", value: country },
];

const tracking = [
  { id: 1, key: "Verification", value: "fachrudin@panganlestari.com" },
  { id: 2, key: "Submitted", value: "fachrudin@panganlestari.com" },
];

const downloadLOA = (file) => {
  window.open(file, "_blank");
};
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard>
        <VCardTitle>
          <h3>Mutual Recognition Agreement / MRA Document</h3>
        </VCardTitle>
        <VCardSubtitle>
          <p>Document for Mutual Halal Certificate Recognition</p>
        </VCardSubtitle>
        <VCardText>
          <VRow v-for="item in MRA" :key="item.id" no-gutters>
            <VCol cols="3">
              {{ item.key }}
            </VCol>
            <VCol cols="1"> : </VCol>
            <VCol cols="8">
              <p>{{ item.value }}</p>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="8">
      <VCard>
        <VCardTitle><h3>Letter of Authorization / LoA Document</h3></VCardTitle>
        <VCardSubtitle>
          <p>An Appointment Letter from the Exporter to the importer</p>
        </VCardSubtitle>
        <VCardText>
          <VRow>
            <VCol cols="3"> Authorizer Company </VCol>
            <VCol cols="1"> : </VCol>
            <VCol cols="8">
              <p>{{ authorizer_company }}</p>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="3"> Authorized Company </VCol>
            <VCol cols="1"> : </VCol>
            <VCol cols="8">
              <p>{{ authorized_company }}</p>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="3"> Date </VCol>
            <VCol cols="1"> : </VCol>
            <VCol cols="8">
              <p>{{ date }}</p>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="3"> Letter No. </VCol>
            <VCol cols="1"> : </VCol>
            <VCol cols="8">
              <p>{{ letter_no }}</p>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="3"> LoA Document </VCol>
            <VCol cols="1"> : </VCol>
            <VCol cols="8">
              <VBtn
                icon="fa-download"
                density="compact"
                @click="downloadLOA(loa_document)"
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="3"> Catatan Pengembalian </VCol>
            <VCol cols="1"> : </VCol>
            <VCol cols="8">
              <VTextField density="compact" />
            </VCol>
          </VRow>
        </VCardText>
        <VCardActions style="justify-content: end">
          <div>
            <ReturnConfirmationModal :id="id" documenttype="loa" />
            <ApproveConfirmationModal :id="id" documenttype="loa" />
          </div>
        </VCardActions>
      </VCard>
    </VCol>
    <VCol cols="4">
      <VCard>
        <VCardTitle>Tracking of LoA</VCardTitle>
        <VCardItem>
          <VTimeline side="end">
            <VTimelineItem
              v-for="item in tracking"
              :key="item.id"
              dot-color="blue"
              max-height="30svh"
            >
              <div>
                <div class="text-h6">
                  {{ item.key }}
                </div>
                <p>{{ item.value }}</p>
              </div>
            </VTimelineItem>
          </VTimeline>
        </VCardItem>
      </VCard>
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="8">
      <VCard>
        <VCardTitle>
          <h3>Original of the Foreign Halal Certificate</h3>
        </VCardTitle>
        <VCardText>
          <VRow>
            <VCol cols="3"> Document </VCol>
            <VCol cols="1"> : </VCol>
            <VCol cols="8">
              <p>{{ document }}</p>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="3"> Document No. </VCol>
            <VCol cols="1"> : </VCol>
            <VCol cols="8">
              <p>{{ document_no }}</p>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="3"> Verification Link (Optional) </VCol>
            <VCol cols="1"> : </VCol>
            <VCol cols="8">
              <p>{{ verification_link }}</p>
            </VCol>
          </VRow>
          <VRow style="display: flex; align-items: center">
            <VCol cols="3"> File </VCol>
            <VCol cols="1"> : </VCol>
            <VCol cols="8">
              <VBtn
                icon="fa-download"
                density="compact"
                @click="downloadLOA(file)"
              />
            </VCol>
          </VRow>
        </VCardText>
        <VCardActions style="justify-content: end">
          <div>
            <ReturnConfirmationModal :id="id" documenttype="fhc" />
            <ApproveConfirmationModal :id="id" documenttype="fhc" />
          </div>
        </VCardActions>
      </VCard>
    </VCol>
    <VCol cols="4">
      <VCard>
        <VCardTitle>Tracking of Certificate</VCardTitle>
        <VCardItem>
          <VTimeline side="end">
            <VTimelineItem
              v-for="item in tracking"
              :key="item.id"
              dot-color="blue"
              max-height="30svh"
            >
              <div>
                <div class="text-h6">
                  {{ item.key }}
                </div>
                <p>{{ item.value }}</p>
              </div>
            </VTimelineItem>
          </VTimeline>
        </VCardItem>
      </VCard>
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="12">
      <VCard>
        <VCardTitle>Requirement Document</VCardTitle>
        <VCardText>
          <VTable>
            <thead>
              <tr>
                <th>No</th>
                <th>Document Types</th>
                <th>Upload / Download</th>
                <th>Record History</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Letter of Application</td>
                <td>
                  <VBtn density="compact">
                    <VFileInput
                      prepend-icon="fa-download"
                      density="compact"
                      hide-input
                      style="color: white"
                    />
                  </VBtn>
                </td>
                <td
                  style="
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  "
                >
                  <VIcon icon="fa-history" />
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Business License Number</td>
                <td>
                  <VBtn density="compact">
                    <VFileInput
                      prepend-icon="fa-download"
                      density="compact"
                      hide-input
                      style="color: white"
                    />
                  </VBtn>
                </td>
                <td
                  style="
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  "
                >
                  <VIcon color="" icon="fa-history" />
                </td>
              </tr>
            </tbody>
          </VTable>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
