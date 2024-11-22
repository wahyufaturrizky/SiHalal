<script setup lang="ts">
const MRA = [
  { id: 1, key: "Halal Institution Name", value: "Halal Transaction Inc." },
  { id: 2, key: "Issued Date", value: "20/02/2024" },
  { id: 3, key: "Expired Date", value: "20/02/2028" },
  { id: 4, key: "Country", value: "USA" },
];
const tracking = [
  { id: 1, key: "Verification", value: "fachrudin@panganlestari.com" },
  { id: 2, key: "Submitted", value: "fachrudin@panganlestari.com" },
];
</script>
<template>
  <VRow>
    <VCol cols="12">
      <VCard>
        <VCardTitle
          ><h3>Mutual Recognition Agreement / MRA Document</h3></VCardTitle
        >
        <VCardSubtitle
          ><p>
            Document for Mutual Halal Certificate Recognition
          </p></VCardSubtitle
        >
        <VCardText>
          <VRow no-gutters v-for="item in MRA" :key="item.id">
            <VCol cols="3">{{ item.key }}</VCol>
            <VCol cols="1">:</VCol>
            <VCol cols="8"
              ><p>{{ item.value }}</p></VCol
            >
          </VRow>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="8">
      <VCard>
        <VCardTitle><h3>Letter of Authorization / LoA Document</h3></VCardTitle>
        <VCardSubtitle
          ><p>
            An Appointment Letter from the Exporter to the importer
          </p></VCardSubtitle
        >
        <VCardText>
          <VRow>
            <VCol cols="3">Authorizer Company</VCol>
            <VCol cols="1">:</VCol>
            <VCol cols="8"><p>MACDONALD MEAT COMPANY</p></VCol>
          </VRow>
          <VRow>
            <VCol cols="3">Authorized Company</VCol>
            <VCol cols="1">:</VCol>
            <VCol cols="8"><p>PT.Pangan Lestari</p></VCol>
          </VRow>
          <VRow>
            <VCol cols="3">Date</VCol>
            <VCol cols="1">:</VCol>
            <VCol cols="8"><p>03/09/2024</p></VCol>
          </VRow>
          <VRow>
            <VCol cols="3">Letter No.</VCol>
            <VCol cols="1">:</VCol>
            <VCol cols="8"><p>-</p></VCol>
          </VRow>
          <VRow>
            <VCol cols="3">LoA Document</VCol>
            <VCol cols="1">:</VCol>
            <VCol cols="8">
              <VBtn density="compact">
                <VFileInput
                  prepend-icon="fa-download"
                  density="compact"
                  hide-input
                  style="color: white"
                >
                </VFileInput>
              </VBtn>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="3">Catatan Pengembalian</VCol>
            <VCol cols="1">:</VCol>
            <VCol cols="8"><VTextField density="compact"></VTextField></VCol>
          </VRow>
        </VCardText>
        <VCardActions style="justify-content: end">
          <div>
            <ReturnConfirmationModal></ReturnConfirmationModal>
            <ApproveConfirmationModal></ApproveConfirmationModal>
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
              dot-color="blue"
              v-for="item in tracking"
              :key="item.id"
              max-height="30svh"
            >
              <div>
                <div class="text-h6">{{ item.key }}</div>
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
        <VCardTitle
          ><h3>Original of the Foreign Halal Certificate</h3></VCardTitle
        >
        <VCardText>
          <VRow>
            <VCol cols="3">Document</VCol>
            <VCol cols="1">:</VCol>
            <VCol cols="8"><p>MACDONALD MEAT COMPANY</p></VCol>
          </VRow>
          <VRow>
            <VCol cols="3">Document No.</VCol>
            <VCol cols="1">:</VCol>
            <VCol cols="8"><p>PT.Pangan Lestari</p></VCol>
          </VRow>
          <VRow>
            <VCol cols="3">Verification Link (Optional)</VCol>
            <VCol cols="1">:</VCol>
            <VCol cols="8"><p>03/09/2024</p></VCol>
          </VRow>
          <VRow style="display: flex; align-items: center">
            <VCol cols="3">File</VCol>
            <VCol cols="1">:</VCol>
            <VCol cols="8">
              <VBtn>
                <VFileInput
                  prepend-icon="fa-download"
                  density="compact"
                  hide-input
                  style="color: white"
                >
                </VFileInput>
              </VBtn>
            </VCol>
          </VRow>
        </VCardText>
        <VCardActions style="justify-content: end">
          <div>
            <ReturnConfirmationModal></ReturnConfirmationModal>
            <ApproveConfirmationModal></ApproveConfirmationModal>
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
              dot-color="blue"
              v-for="item in tracking"
              :key="item.id"
              max-height="30svh"
            >
              <div>
                <div class="text-h6">{{ item.key }}</div>
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
                    >
                    </VFileInput>
                  </VBtn>
                </td>
                <td
                  style="
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  "
                >
                  <VIcon icon="fa-history"></VIcon>
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
                    >
                    </VFileInput>
                  </VBtn>
                </td>
                <td
                  style="
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  "
                >
                  <VIcon color="" icon="fa-history"></VIcon>
                </td>
              </tr>
            </tbody>
          </VTable>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
